/**
 * Logger controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const { maxBadRequestsPerMinute } = require('../config');
const requestIp = require('request-ip');
const logs = require('../db/status-logs');

/**
 * Export modules
 */
module.exports = {
    getAvailability
}

/**
 * Checks if user hasn't exceeded max bad calls per minute.
 * @public
 * @param req - HTTP Request Object.
 * @param res - HTTP Response Object.
 */
function getAvailability(req, res, next) {
    logs.getCount(requestIp.getClientIp(req)).then(data => {
        if (data[0].count <= maxBadRequestsPerMinute) {
            res.send(`All good only ${data[0].count} bad requests last minute!`);
        } else {
            res.send('Too many bad requests!');
        }
    });
}