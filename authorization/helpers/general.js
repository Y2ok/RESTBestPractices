/**
 * General Helper functions.
 */

/**
 * Load all libraries.
 */
const jwt = require('jsonwebtoken');

/**
 * Export all modules.
 */
module.exports = {
    generateToken
};

/**
 * Generate a JWT token for session.
 * @public
 * @param {string} secret Secret token.
 * @param {number} userId User's id.
 * @returns {string} secret JWT token for user.
 */
function generateToken(secret, userId) {
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: userId,
        exp: parseInt(expiry.getTime() / 1000),
    }, secret);
}