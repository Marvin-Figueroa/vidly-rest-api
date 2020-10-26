const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/userModel');

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  console.log('From the userController.getUser: ', user);
  return res.send(user);
};

exports.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered.');
  }

  // Encriptando la contraseña con bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
  });

  const token = user.generateAuthToken();
  return res
    .header('x-auth-token', token)
    .send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
};
