/**
 * Load all necessary libraries.
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const response = require('./helpers/response');


/**
 * Load all routes
 */
const routes = require('./routes');

/**
 * Setup app
 */
const app = express();

// General settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
app.use('/', routes);

/**
 * Setup error handling.
 */


// error handler for csrf
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403);
  res.send('CSRF error!');
});

// Catch and forward 404 error
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  const message = {
    error: 'Not found!'
  };
  return response.reportMessage(err.status, message, res);
});

// Setup error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 401) {
    const message = {
      error: 'Not authorized!'
    };
    response.reportMessage(err.status || 500, message, res);
  } else {
    console.log(err);
    const message = {
      error: 'Unexpected error!'
    }
    response.reportMessage(err.status || 500, message, res);
  }
});

module.exports = app;
