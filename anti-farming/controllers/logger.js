/**
 * Logger controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const { maxRequestsPerMinute } = require('../config');
const requestIp = require('request-ip');
const logs = require('../db/logs');

/**
 * Export modules
 */
module.exports = {
    getAvailability
}

/**
 * Checks if user hasn't exceeded max calls per minute.
 * @public
 * @param req - HTTP Request Object.
 * @param res - HTTP Response Object.
 */
function getAvailability(req, res, next) {
    logs.getCount(requestIp.getClientIp(req)).then(data => {
        if (data[0].count <= maxRequestsPerMinute) {
            logs.insert(
                {
                    caller: requestIp.getClientIp(req),
                    'date-time': new Date().toISOString()
                }
            ).then(insert => {
                res.send(data[0].count);
            }).catch(err => next(err));
        } else {
            res.send('Too many requests!')
        }
    });
}