/**
 * Resource controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const resources = require('../db/resources');
const users = require('../db/users');

/**
 * Export modules
 */
module.exports = {
    insertUser,
    getUser,
    insertResource,
    getResource
}

/**
 * Creates a resource in database.
 */
function insertResource(req, res, next) {
    resources.insert(
        {
            name: req.body.name,
            userId: req.body.userId
        }
    ).then(data => {
        res.status(201).send('resource inserted');
    }).catch(err => {
        next(err);
    });
}

/**
 * Retrieves a resource from database.
 */
function getResource(req, res, next) {
    resources.get(req.params.userId)
        .then(data => {
            if (data.length > 0 ) {
                res.status(200).send('data retrieved');
            } else {
                res.status(404).send('no data');
            }
        }).catch(err => {
            next(err);
        })
}

/**
 * Create an user in database
 */
function insertUser(req, res, next) {
    users.insert(
        {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            visibleId: 'verySecretVisibleID',
            password: req.body.password,
        }
    ).then(data => {
        res.status(201).send('user inserted');
    }).catch(err => {
        next(err);
    })
}

/**
 * Retrieve user from the database.
 */
function getUser(req, res, next) {
    users.getOne(req.params.userId)
        .then(data => {
            if (data === null) {
                res.status(404).send('not found');
            }
            if (data.length > 0 ) {
                res.status(200).send('user retrieved');
            } else {
                res.status(404).send('no data');
            }
        }).catch(err => {
            res.status(404).send('no data');
        });
}