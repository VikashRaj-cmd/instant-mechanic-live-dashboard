const Mechanic = require('../models/Mechanic');
const inMemory = require('../services/inMemoryDataService');

// Get All Mechanics & Duty Status
exports.getMechanics = async (req, res) => {
  try {
    let mechanics = [];
    let isDbConnected = false;

    try {
      if (Mechanic.db.readyState === 1) {
        mechanics = await Mechanic.find().lean();
        isDbConnected = true;
      }
    } catch (e) {
      // Fallback
    }

    if (!isDbConnected || mechanics.length === 0) {
      mechanics = inMemory.MECHANICS;
    }

    return res.status(200).json({
      success: true,
      count: mechanics.length,
      data: mechanics
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
