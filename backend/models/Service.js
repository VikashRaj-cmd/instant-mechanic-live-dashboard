const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Emergency Repair',
        'Engine Diagnostic',
        'Oil & Filter Service',
        'Brake System',
        'Battery & Electrical',
        'Tire & Wheel'
      ]
    },
    basePrice: { type: Number, required: true },
    estimatedMinutes: { type: Number, default: 45 },
    description: { type: String, required: true },
    icon: { type: String, default: 'Wrench' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
