const express = require('express');
const rentalsController = require('../controllers/rentalsController');

const router = express.Router();

router
  .route('/')
  .get(rentalsController.getAllRentals)
  .post(rentalsController.createRental);

module.exports = router;
