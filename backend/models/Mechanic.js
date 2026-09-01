const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ['Available', 'On Duty', 'In Transit', 'Busy', 'Offline'],
      default: 'Available'
    },
    jobsCompleted: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    avatar: { type: String, default: '' },
    specialization: { type: String, default: 'General Auto Repair' },
    location: {
      address: { type: String, default: 'Operational Depot' },
      lat: { type: Number, default: 37.7749 },
      lng: { type: Number, default: -122.4194 }
    },
    currentBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mechanic', mechanicSchema);
