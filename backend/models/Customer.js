const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    avatar: { type: String, default: '' },
    totalBookings: { type: Number, default: 0 },
    vehicles: [
      {
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        licensePlate: { type: String, required: true },
        vin: { type: String }
      }
    ],
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
