/**
 * Response handler helper.
 */

// List of error codes
const errors = {
    duplicateEntryCode: '23505',
    foreignKeyNotFound: '23503'
}

/**
 * Export modules.
 */
module.exports = {
    reportMessage,
    errors
}

/**
 * Provide error/success messages for the application.
 * @public
 * @param {number} code HTTP error/success code which will be returned.
 * @param {Object|undefined} message Error/success message object which will be returned.
 * @param {Object} res HTTP response object.
 * @returns {Object} HTTP response with code and message.
 */
function reportMessage(code, message, res) {
    // Return error/success with message, otherwise - return just an error/success
    if (message !== undefined) {
        return res.status(code).json(message);
    }
    let errors = "Unexpected error, please contact site administrator!";
    return res.status(code).json({ errors });
}