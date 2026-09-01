const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');

router.get('/', mechanicController.getMechanics);

module.exports = router;
