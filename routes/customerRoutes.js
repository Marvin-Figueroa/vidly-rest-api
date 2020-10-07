const express = require('express');
const customersController = require('../controllers/customersController');
const validator = require('../middleware/validateMongoObjectId');

const router = express.Router();

router.param('id', validator.validateId);

router
  .route('/')
  .get(customersController.getAllCustomers)
  .post(customersController.createCustomer);

router
  .route('/:id')
  .get(customersController.getCustomer)
  .put(customersController.updateCustomer)
  .delete(customersController.deleteCustomer);

module.exports = router;
