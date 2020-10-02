const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 20,
    required: true,
    trim: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().trim(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(8).max(20).required().trim(),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
