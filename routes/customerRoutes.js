const express = require('express');
const { Customer, validateCustomer } = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort({ name: -1 });
  return res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send('The customer with the given ID was not found.');
  }

  return res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.create({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  return res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold || false,
      phone: req.body.phone,
    },
    { new: true, useFindAndModify: false }
  );

  if (!customer) {
    return res
      .status(404)
      .send('The customer with the given ID was not found.');
  }

  return res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return res
      .status(404)
      .send('The customer with the given ID was not found.');
  }

  return res.send(customer);
});

module.exports = router;
