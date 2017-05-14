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
const requestIp = require('request-ip');
const logs = require('./db/status-logs');


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

// Catch and forward 404 error
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  if (err.status >= 400 && err.status < 500) {
    logs.insert(
      {
        caller: requestIp.getClientIp(req),
        'date-time': new Date().toISOString(),
        'status': err.status
      }
    ).then(insert => {
      const message = {
        error: 'Not found!'
      };
      return response.reportMessage(err.status, message, res);
    }).catch(err => next(err));
  }  
});

// Setup error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status >= 400 && err.status < 500) {
    logs.insert(
      {
        caller: requestIp.getClientIp(req),
        'date-time': new Date().toISOString(),
        'status': err.status
      }
    ).then(insert => {
      next();
    }).catch(err => next(err));
  }  
  
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
