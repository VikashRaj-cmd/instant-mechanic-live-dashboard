const Customer = require('../models/Customer');
const inMemory = require('../services/inMemoryDataService');

exports.getCustomers = async (req, res) => {
  try {
    let customers = [];
    let isDbConnected = false;

    try {
      if (Customer.db.readyState === 1) {
        customers = await Customer.find().lean();
        isDbConnected = true;
      }
    } catch (e) {
      // Fallback
    }

    if (!isDbConnected || customers.length === 0) {
      customers = inMemory.CUSTOMERS;
    }

    return res.status(200).json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
