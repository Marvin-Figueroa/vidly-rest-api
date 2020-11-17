const { Genre, validateGenre } = require('../models/genreModel');
// const asyncErrorMiddleware = require('../middleware/asyncErrorMiddleware');

exports.getAllGenres = async (req, res) => {
  throw new Error('A self made error has ocurred.');
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
};

exports.getGenre = async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  return res.send(genre);
};

exports.createGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.create({ name: req.body.name });
  return res.send(genre);
};

exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  return res.status(204).send({ state: 'success', data: null });
};

exports.updateGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  return res.send(genre);
};
