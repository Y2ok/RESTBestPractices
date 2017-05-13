const express = require('express');
const router = express.Router();

const resourceController = require('../controllers/resources');

router.get('/resources/:userId', resourceController.getResource);

router.post('/resources', resourceController.insertResource);

router.get('/users/:userId', resourceController.getUser);

router.post('/users', resourceController.insertUser);

module.exports = router;
