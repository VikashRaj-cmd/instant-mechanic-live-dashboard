const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String },
    customerEmail: { type: String },
    
    vehicle: {
      make: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      licensePlate: { type: String, required: true }
    },
    
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    serviceName: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    
    mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', default: null },
    mechanicName: { type: String, default: 'Unassigned' },
    
    status: {
      type: String,
      enum: ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
      index: true
    },
    
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Refunded'],
      default: 'Paid'
    },
    
    location: {
      address: { type: String, required: true },
      lat: { type: Number, default: 37.7749 },
      lng: { type: Number, default: -122.4194 }
    },
    
    notes: { type: String, default: '' },
    scheduledAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

// Search & Sort Indexing
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ amount: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
