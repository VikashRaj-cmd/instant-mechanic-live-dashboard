const Booking = require('../models/Booking');
const Mechanic = require('../models/Mechanic');
const inMemory = require('../services/inMemoryDataService');
const { getIO } = require('../services/socketService');

// Get Paginated & Filtered Bookings List
exports.getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const category = req.query.category || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    let bookings = [];
    let isDbConnected = false;

    try {
      if (Booking.db.readyState === 1) {
        const query = {};

        if (status && status !== 'All') {
          query.status = status;
        }

        if (category && category !== 'All') {
          query.serviceCategory = category;
        }

        if (search) {
          query.$or = [
            { bookingId: { $regex: search, $options: 'i' } },
            { customerName: { $regex: search, $options: 'i' } },
            { mechanicName: { $regex: search, $options: 'i' } },
            { 'vehicle.make': { $regex: search, $options: 'i' } },
            { 'vehicle.model': { $regex: search, $options: 'i' } },
            { serviceName: { $regex: search, $options: 'i' } }
          ];
        }

        const totalBookings = await Booking.countDocuments(query);
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder;

        bookings = await Booking.find(query)
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();

        isDbConnected = true;

        return res.status(200).json({
          success: true,
          pagination: {
            totalBookings,
            currentPage: page,
            totalPages: Math.ceil(totalBookings / limit),
            limit
          },
          data: bookings
        });
      }
    } catch (e) {
      // Fallback
    }

    // In-Memory Fallback Execution
    let filtered = [...inMemory.BOOKINGS];

    if (status && status !== 'All') {
      filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(b => b.serviceCategory.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b =>
        b.bookingId.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.mechanicName.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q) ||
        b.vehicle.make.toLowerCase().includes(q) ||
        b.vehicle.model.toLowerCase().includes(q)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'createdAt') {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      }
      if (valA < valB) return -1 * sortOrder;
      if (valA > valB) return 1 * sortOrder;
      return 0;
    });

    const totalBookings = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return res.status(200).json({
      success: true,
      pagination: {
        totalBookings,
        currentPage: page,
        totalPages: Math.ceil(totalBookings / limit) || 1,
        limit
      },
      data: paginated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Booking Detail by ID or bookingId
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    let booking = null;

    try {
      if (Booking.db.readyState === 1) {
        booking = await Booking.findOne({
          $or: [{ _id: id }, { bookingId: id }]
        }).lean();
      }
    } catch (e) {
      // Fallback
    }

    if (!booking) {
      booking = inMemory.BOOKINGS.find(b => b._id === id || b.bookingId === id);
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Booking Status & Trigger Live Socket.io Event
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, mechanicId, mechanicName } = req.body;

    const validStatuses = ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    let updatedBooking = null;

    try {
      if (Booking.db.readyState === 1) {
        const updateData = { status };
        if (mechanicName) updateData.mechanicName = mechanicName;
        if (mechanicId) updateData.mechanic = mechanicId;
        if (status === 'Completed') updateData.completedAt = new Date();

        updatedBooking = await Booking.findOneAndUpdate(
          { $or: [{ _id: id }, { bookingId: id }] },
          updateData,
          { new: true }
        ).lean();
      }
    } catch (e) {
      // Fallback
    }

    if (!updatedBooking) {
      const idx = inMemory.BOOKINGS.findIndex(b => b._id === id || b.bookingId === id);
      if (idx !== -1) {
        inMemory.BOOKINGS[idx].status = status;
        if (mechanicName) inMemory.BOOKINGS[idx].mechanicName = mechanicName;
        if (status === 'Completed') inMemory.BOOKINGS[idx].completedAt = new Date();
        updatedBooking = inMemory.BOOKINGS[idx];
      }
    }

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Broadcast Real-Time Socket.io Event
    try {
      const io = getIO();
      if (io) {
        io.emit('booking_status_updated', {
          booking: updatedBooking,
          message: `Booking #${updatedBooking.bookingId} status changed to ${status}`,
          timestamp: new Date()
        });
      }
    } catch (err) {
      console.warn('[Socket Broadcast Warning]:', err.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
