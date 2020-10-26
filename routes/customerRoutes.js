const express = require('express');
const customersController = require('../controllers/customersController');
const validateId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Asegura que el parametro id de la request sea un ObjectId valido
router.param('id', validateId);

router
  .route('/')
  .get(customersController.getAllCustomers)
  .post(auth, customersController.createCustomer);

router
  .route('/:id')
  .get(customersController.getCustomer)
  .put(auth, customersController.updateCustomer)
  .delete(auth, admin, customersController.deleteCustomer);

module.exports = router;
