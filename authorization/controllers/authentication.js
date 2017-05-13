/**
 * Authentication controller.
 */

/**
 * Load required libraries.
 */
const passport = require('passport');
const response = require('../helpers/response');
const general = require('../helpers/general');
const { secretToken } = require('../config');
const users = require('../db/users');
const bcrypt = require('bcrypt');

/**
 * Export modules
 */
module.exports = {
    login,
    registration,
    authentication,
    serializeUser,
    deserializeUser
}

/**
 * Authentication function which overrides standard PassportJS authentication function.
 * @public
 * @param {string} email User's email address.
 * @param {string} password User's password.
 * @param {Function} done Callback function.
 * @returns {Function} Callback function with response.
 */
function authentication(email, password, done) {
    // Select from database password by e-mail
    users.getOneByEmail(email)
        .then((data) => {
            // Check if data is returned
            if (data === undefined) {
                const message = "E-mail address or password is incorrect!";
                return done(null, false, { message });
            }

            // Compare data
            bcrypt.compare(password, data.password, (error, result) => {
                // If any errors during the hashing process, return an error
                if (error) {
                    return done(null, false, error);
                }

                // If invalid data, deny authorization
                if (!result) {
                    const message = "E-mail address or password is incorrect!";
                    return done(null, false, { message });
                }

                // Authorize user
                return done(null, data);
            });
        })
        .catch((error) => {
            // Something unexpected happened, return 500
            return done(null, false);
        });
}

/**
 * Login function which tries to authorize user.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function login(req, res) {
    // Authorize user
    passport.authenticate('local', (error, user, info) => {
        // Check if any internal errors for passportjs
        if (error) {
            return response.reportMessage(500, undefined, res);
        }

        // Check if user is authorized
        if (user) {
            // Generate a token for user
            const token = general.generateToken(secretToken, user.id);

            // Return data to user
            const message = {
                role: user.role,
                id: user.id,
                token
            };
            return response.reportMessage(200, message, res);
        }

        // Check if any info messages
        if (info) {
            const message = {
                errors: info.message
            };
            return response.reportMessage(401, message, res);
        }

        // Report internal server error
        return response.reportMessage(500, undefined, res);
    })(req, res);
}

/**
 * Registration function which tries to register user.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Either success of error response.
 */
function registration(req, res) {
    // Tries to register user in database
    return registerUser(req, res);
}

/**
 * Tries to register user in database.
 * @private
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Either success or error response.
 */
function registerUser(req, res) {
    bcrypt.hash(req.body.password, 12, (error, hashedPass) => {
        // If any errors during hashing, return an error
        if (error) {
            return response.reportMessage(500, undefined, res);
        }

        // Setup insert data
        const user = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPass,
        };

        // Let's insert user in database
        users.insert(user)
            .then(() => {
                // User has been registered, notify user
                const message = {
                    success: "User Has been Registered!"
                };
                return response.reportMessage(201, message, res);
            })
            .catch((error) => {
                // If duplicate entry, return according message
                if (error.code === response.errors.duplicateEntryCode) {
                    const message = {
                        errors: "User with that e-mail already exists!"
                    };
                    return response.reportMessage(400, message, res);
                } else {
                    // There is an internal error in database
                    return response.reportMessage(500, undefined, res);
                }
            });
    });
}

/**
 * Serialize user data.
 * @public
 * @param {Object} user User returned data.
 * @param {Function} done Callback function.
 */
function serializeUser(user, done) {
    done(null, user.id);
}

/**
 * Deserialize user data.
 * @public
 * @param {number} id User id.
 * @param {Function} done Callback function.
 */
function deserializeUser(id, done) {
    users.getOne(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(`User with the id ${id} does not exist`);
        })
}

