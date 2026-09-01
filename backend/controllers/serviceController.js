const Service = require('../models/Service');
const inMemory = require('../services/inMemoryDataService');

exports.getServices = async (req, res) => {
  try {
    let services = [];
    let isDbConnected = false;

    try {
      if (Service.db.readyState === 1) {
        services = await Service.find().lean();
        isDbConnected = true;
      }
    } catch (e) {
      // Fallback
    }

    if (!isDbConnected || services.length === 0) {
      services = inMemory.SERVICES;
    }

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
