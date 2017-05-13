/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions
 */
module.exports = {
	getOneByEmail,
	getOne,
	insert
};

/**
 * Create Users object.
 * @private
 */
function Users() {
	return knex('users');
}

/**
 * Retrieves single user by id.
 * @public
 * @param {number} id User's id.
 * @returns {Object} Returned user object from database.
 */
function getOne(id) {
	return Users().select('id', 'name', 'surname', 'email', 'expectedCalories', 'role').where('id', id).first();
}

/**
 * Retrieves single user by email.
 * @public
 * @param {string} email User's email.
 * @returns {Object} Returned user object from database.
 */
function getOneByEmail(email) {
	return Users().select('*').where('email', email).first();
}

/**
 * Inserts an entry in users table.
 * @public
 * @param {Object} user Object with all user's data.
 * @returns {Object} Insert query response from database.
 */
function insert(user) {
	return Users().insert(user);
}
