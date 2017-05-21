/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions
 */
module.exports = {
	insert,
	getCount
};

/**
 * Create status logs object.
 * @private
 */
function Logs() {
	return knex('status-logs');
}

/**
 * Inserts an entry in logs table.
 * @public
 * @param {Object} log Object with all log's data.
 * @returns {Object} Insert query response from database.
 */
function insert(log) {
	return Logs().insert(log);
}

/**
 * Returns count of how many times have resources been called by the user in a given timeframe.
 * @public
 * @param {string} ip Users ip address.
 */
function getCount(ip) {
	let date = new Date(new Date().getTime()-60000);
	return Logs().count('caller').where('caller', ip).andWhere('date-time', '>', date).andWhere('status', '>=', 400);
}