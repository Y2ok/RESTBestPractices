const express = require('express');
const router = express.Router();
const { maxRequestsPerMinute } = require('../config');

const loggerController = require('../controllers/logger');

/**
 * Secured resource.
 */
router.get('/safe', loggerController.getAvailability);

module.exports = router;
