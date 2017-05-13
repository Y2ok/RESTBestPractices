/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions
 */
module.exports = {
	insert,
	get
};

/**
 * Create resources object.
 * @private
 */
function Resources() {
	return knex('resources');
}

/**
 * Inserts an entry in resources table.
 * @public
 * @param {Object} resource Object with all resource's data.
 * @returns {Object} Insert query response from database.
 */
function insert(resource) {
	return Resources().insert(resource);
}

/**
 * Returns all resources.
 * @public
 * @param {string} id - user id.
 * @returns {Object} Resources for the user. 
 */
function get(id) {
	return Resources().select('name').where('userId', id);
}