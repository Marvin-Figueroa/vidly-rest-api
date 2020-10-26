const express = require('express');
const rentalsController = require('../controllers/rentalsController');
const auth = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(rentalsController.getAllRentals)
  .post(auth, rentalsController.createRental);

module.exports = router;
