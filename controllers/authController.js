const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');

function validateAuth(userAuth) {
  const schema = Joi.object({
    password: Joi.string().trim().min(8).max(255).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(userAuth);
}

exports.authenticateUser = async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(400).send('Invalid username or password.');
  }

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send('User authenticated successfully.');
  // Envio el token en la response (Hay que modificar esto)
  // return res.send(token);
};
