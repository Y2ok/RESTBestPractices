const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const dataRoutes = require('./data');

/* Setup routes */
router.use('/', dataRoutes);

module.exports = router;
