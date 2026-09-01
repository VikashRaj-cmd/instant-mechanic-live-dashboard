import React from 'react';
import { X, Car, User, Wrench, Calendar, DollarSign, MapPin, FileText, CheckCircle } from 'lucide-react';
import { Booking } from '../../types';

interface BookingDetailModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-extrabold text-blue-400">#{booking.bookingId}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {booking.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Created on {new Date(booking.createdAt).toLocaleString()}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Customer Profile */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" /> Customer Information
            </p>
            <p className="font-bold text-slate-200 text-sm">{booking.customerName}</p>
            <p className="text-slate-400">Phone: {booking.customerPhone || 'N/A'}</p>
            <p className="text-slate-400">Email: {booking.customerEmail || 'N/A'}</p>
            <p className="text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-rose-400" /> {booking.location?.address}
            </p>
          </div>

          {/* Vehicle Metadata */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-emerald-400" /> Vehicle Profile
            </p>
            <p className="font-bold text-slate-200 text-sm">
              {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
            </p>
            <p className="text-slate-400 font-mono">License Plate: <span className="text-slate-200">{booking.vehicle.licensePlate}</span></p>
            <p className="text-slate-400 font-mono text-[10px]">VIN: {booking.vehicle.vin || '1FA6P8CF0H519284'}</p>
          </div>

          {/* Service & Category */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-purple-400" /> Service Requested
            </p>
            <p className="font-bold text-slate-200 text-sm">{booking.serviceName}</p>
            <p className="text-slate-400">Category: {booking.serviceCategory}</p>
            <p className="text-slate-400">Assigned Mechanic: <span className="text-blue-400 font-semibold">{booking.mechanicName}</span></p>
          </div>

          {/* Payment & Amount */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <p className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Billing Details
            </p>
            <p className="font-bold text-emerald-400 text-lg">${booking.amount}</p>
            <p className="text-slate-400">Payment Status: <span className="text-emerald-400 font-semibold">{booking.paymentStatus}</span></p>
            <p className="text-slate-400">Invoice: INV-{booking.bookingId.replace('BK-', '')}</p>
          </div>
        </div>

        {/* Diagnostic Notes */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 text-xs">
          <p className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" /> Diagnostic & Customer Notes
          </p>
          <p className="text-slate-300 italic">{booking.notes || 'Customer requested standard inspection and maintenance.'}</p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
