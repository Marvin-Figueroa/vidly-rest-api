const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(usersController.createUser);

router.route('/me').get(auth, usersController.getUser);

module.exports = router;
