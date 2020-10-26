const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genreModel');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    trim: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().max(100).min(2).trim().required(),
    dailyRentalRate: Joi.number().min(0).max(100).default(0),
    numberInStock: Joi.number().min(0).max(255).required(),
    // Verifico si genreId es un ObjectId valido con la RegEx en pattern
    genreId: Joi.string()
      .required()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/),
  });

  return schema.validate(movie);
}

module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;
