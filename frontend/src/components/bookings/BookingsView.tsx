import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Car,
  User,
  Wrench,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { fetchBookings, updateBookingStatus } from '../../services/api';

interface BookingsViewProps {
  onRefreshTriggered?: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({ onRefreshTriggered }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetchBookings({
        page,
        limit: 10,
        search,
        status: statusFilter,
        category: categoryFilter,
        sortBy,
        sortOrder
      });
      setBookings(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotalBookings(res.pagination.totalBookings);
    } catch (err) {
      console.error('[Error loading bookings]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [page, search, statusFilter, categoryFilter, sortBy, sortOrder]);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      setUpdatingId(bookingId);
      await updateBookingStatus(bookingId, newStatus);
      await loadBookings();
      if (onRefreshTriggered) onRefreshTriggered();
    } catch (err) {
      console.error('[Error updating status]:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    const badgeStyles: Record<BookingStatus, string> = {
      Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      Assigned: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Mechanic On The Way': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      'In Progress': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      Cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    };

    return badgeStyles[status] || 'bg-slate-800 text-slate-400 border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Live Service Bookings</h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor, search, filter, and dispatch vehicle service bookings in real-time.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          Showing <span className="text-blue-400 font-bold">{totalBookings}</span> total bookings
        </div>
      </div>

      {/* Controls Bar: Search, Status Filter, Category Filter, Sort */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search ID, customer, vehicle, mechanic..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-200">All Statuses</option>
              <option value="Pending" className="bg-slate-900 text-slate-200">Pending</option>
              <option value="Assigned" className="bg-slate-900 text-slate-200">Assigned</option>
              <option value="Mechanic On The Way" className="bg-slate-900 text-slate-200">On The Way</option>
              <option value="In Progress" className="bg-slate-900 text-slate-200">In Progress</option>
              <option value="Completed" className="bg-slate-900 text-slate-200">Completed</option>
              <option value="Cancelled" className="bg-slate-900 text-slate-200">Cancelled</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-200">All Categories</option>
              <option value="Emergency Repair" className="bg-slate-900 text-slate-200">Emergency Repair</option>
              <option value="Engine Diagnostic" className="bg-slate-900 text-slate-200">Engine Diagnostic</option>
              <option value="Oil & Filter Service" className="bg-slate-900 text-slate-200">Oil & Filter</option>
              <option value="Brake System" className="bg-slate-900 text-slate-200">Brake System</option>
              <option value="Battery & Electrical" className="bg-slate-900 text-slate-200">Battery & Electrical</option>
              <option value="Tire & Wheel" className="bg-slate-900 text-slate-200">Tire & Wheel</option>
            </select>
          </div>

          {/* Sort By */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
            <span>Sort: {sortBy === 'createdAt' ? 'Date' : 'Amount'} ({sortOrder.toUpperCase()})</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Mechanic</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Date / Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={8} className="py-4 px-4 h-12 bg-slate-900/30" />
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertTriangle className="w-8 h-8 text-amber-400" />
                      <p className="font-semibold text-slate-300">No bookings match your current search/filters.</p>
                      <p className="text-[11px] text-slate-500">Try adjusting your status filter or clearing text search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-800/40 transition-colors group">
                    {/* Booking ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                      #{booking.bookingId}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-semibold text-[10px]">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{booking.customerName}</p>
                          <p className="text-[10px] text-slate-500">{booking.customerPhone || 'Contact'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Car className="w-3.5 h-3.5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-200">
                            {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {booking.vehicle.licensePlate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-200">{booking.serviceName}</p>
                      <span className="text-[10px] text-slate-400">{booking.serviceCategory}</span>
                    </td>

                    {/* Mechanic */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-slate-400" />
                        <span className={`font-medium ${booking.mechanicName === 'Unassigned' ? 'text-amber-400 font-normal italic' : 'text-slate-200'}`}>
                          {booking.mechanicName}
                        </span>
                      </div>
                    </td>

                    {/* Status with Quick Mutation Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={booking.status}
                        disabled={updatingId === booking.bookingId}
                        onChange={(e) => handleStatusChange(booking.bookingId, e.target.value as BookingStatus)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        <option value="Pending" className="bg-slate-900 text-amber-400">Pending</option>
                        <option value="Assigned" className="bg-slate-900 text-blue-400">Assigned</option>
                        <option value="Mechanic On The Way" className="bg-slate-900 text-indigo-400">On The Way</option>
                        <option value="In Progress" className="bg-slate-900 text-purple-400">In Progress</option>
                        <option value="Completed" className="bg-slate-900 text-emerald-400">Completed</option>
                        <option value="Cancelled" className="bg-slate-900 text-rose-400">Cancelled</option>
                      </select>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-semibold text-slate-100">
                      ${booking.amount}
                      <span className="block text-[9px] font-normal text-emerald-400">{booking.paymentStatus}</span>
                    </td>

                    {/* Date / Time */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Page <span className="font-semibold text-slate-200">{page}</span> of <span className="font-semibold text-slate-200">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
