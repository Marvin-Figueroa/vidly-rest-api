const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
    trim: true,
  },
});

const GenreModel = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().max(100).min(4).trim().required(),
  });

  return schema.validate(genre);
}

module.exports.Genre = GenreModel;
module.exports.validateGenre = validateGenre;
