/**
 * Load all necessary libraries.
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const response = require('./helpers/response');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Load all necessary controllers.
 */
const authenticationController = require('./controllers/authentication');

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
app.use(expressSession({
  secret: config.secretToken,
  resave: false,
  saveUninitialized: false
}));

// Setup passport settings
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/', routes);

// Setup passport js
passport.use(new LocalStrategy({ usernameField: 'email' }, authenticationController.authentication));
passport.serializeUser(authenticationController.serializeUser);
passport.deserializeUser(authenticationController.deserializeUser);

/**
 * Setup error handling.
 */

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
