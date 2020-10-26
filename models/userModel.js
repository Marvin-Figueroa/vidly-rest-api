const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 512,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    password: Joi.string().trim().min(8).max(255).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
