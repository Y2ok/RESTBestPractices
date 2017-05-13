const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const authenticationRoutes = require('./authentication');
const usersRoutes = require('./users');

/* Setup routes */
router.use('/', authenticationRoutes);
router.use('/users', usersRoutes);

module.exports = router;
