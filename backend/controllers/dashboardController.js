const Booking = require('../models/Booking');
const Mechanic = require('../models/Mechanic');
const Customer = require('../models/Customer');
const inMemory = require('../services/inMemoryDataService');

// Calculate KPI & Analytics dataset
exports.getDashboardStats = async (req, res) => {
  try {
    let bookings = [];
    let mechanics = [];
    let customers = [];
    let isDbConnected = false;

    try {
      if (Booking.db.readyState === 1) {
        bookings = await Booking.find().lean();
        mechanics = await Mechanic.find().lean();
        customers = await Customer.find().lean();
        isDbConnected = true;
      }
    } catch (e) {
      // Fallback
    }

    if (!isDbConnected || bookings.length === 0) {
      bookings = inMemory.BOOKINGS;
      mechanics = inMemory.MECHANICS;
      customers = inMemory.CUSTOMERS;
    }

    const totalBookings = bookings.length;
    
    // Today's bookings
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todaysBookings = bookings.filter(b => new Date(b.createdAt) >= startOfToday).length;

    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
    const inProgressBookings = bookings.filter(b => ['Assigned', 'Mechanic On The Way', 'In Progress'].includes(b.status)).length;

    // Revenue calculation
    const totalRevenue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    // Active Mechanics (On Duty, In Transit, Busy, Available)
    const activeMechanics = mechanics.filter(m => m.status !== 'Offline').length;

    // New Customers (Joined in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newCustomers = customers.filter(c => new Date(c.joinedAt || c.createdAt) >= thirtyDaysAgo).length;

    // Analytics: Bookings & Revenue Over Time (Grouped by Month/Week)
    const monthlyStatsMap = {};
    bookings.forEach(b => {
      const date = new Date(b.createdAt);
      const monthKey = date.toLocaleString('default', { month: 'short' });
      if (!monthlyStatsMap[monthKey]) {
        monthlyStatsMap[monthKey] = { month: monthKey, bookings: 0, revenue: 0 };
      }
      monthlyStatsMap[monthKey].bookings += 1;
      if (b.status !== 'Cancelled') {
        monthlyStatsMap[monthKey].revenue += b.amount || 0;
      }
    });

    const bookingsOverTime = Object.values(monthlyStatsMap).reverse();

    // Analytics: Booking Status Breakdown
    const statusBreakdown = [
      { status: 'Completed', count: completedBookings, color: '#10B981' },
      { status: 'Pending', count: pendingBookings, color: '#F59E0B' },
      { status: 'Active (On Way/Progress)', count: inProgressBookings, color: '#3B82F6' },
      { status: 'Cancelled', count: cancelledBookings, color: '#EF4444' }
    ];

    // Analytics: Service / Category Breakdown
    const categoryMap = {};
    bookings.forEach(b => {
      const cat = b.serviceCategory || 'General Service';
      if (!categoryMap[cat]) categoryMap[cat] = 0;
      categoryMap[cat] += 1;
    });

    const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
      category: cat,
      count: categoryMap[cat]
    }));

    return res.status(200).json({
      success: true,
      data: {
        overview: {
          totalBookings,
          todaysBookings,
          completedBookings,
          pendingBookings,
          cancelledBookings,
          inProgressBookings,
          totalRevenue,
          activeMechanics,
          totalMechanics: mechanics.length,
          newCustomers,
          totalCustomers: customers.length
        },
        analytics: {
          bookingsOverTime,
          statusBreakdown,
          categoryBreakdown
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
