const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const { secretToken } = require('../config');
const requireAuth = expressJwt({
  secret: secretToken
});

/**
 * Secured resource.
 */
router.get('/safe', requireAuth, (req, res, next) => {
  res.send('Resource which can be accessed only with token');
});

/**
 * Unsecured resource.
 */
router.get('/unsafe', (req, res, next) => {
  res.send('Resource which can be accessed without token');
});

module.exports = router;
