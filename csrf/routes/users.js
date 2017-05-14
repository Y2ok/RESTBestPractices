const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

/**
 * Get token
 */
router.get('/token', csrfProtection, (req, res, next) => {
  res.status(200).send({ csrfToken: req.csrfToken() });
});

/**
 * Secured resource.
 */
router.post('/safe', parseForm, csrfProtection, (req, res, next) => {
  res.send('Resource which can be accessed only with CSRF token');
});

/**
 * Unsecured resource.
 */
router.post('/unsafe', (req, res, next) => {
  res.send('Resource which can be accessed without token');
});

module.exports = router;
