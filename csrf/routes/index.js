const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const usersRoutes = require('./users');

/* Setup routes */
router.use('/', usersRoutes);

module.exports = router;
