const { Movie, validateMovie } = require('../models/movieModel');
const { Genre } = require('../models/genreModel');

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find().sort({ title: 1 });
  return res.send(movies);
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send('The movie with the given ID was not found.');
  }

  return res.send(movie);
};

exports.createMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  // Que pasa si en req.body.genreId paso algo que no sea un MongoDBObjectId???
  // CastError: Cast to ObjectId failed for value "5" at path "_id" for model "Genre"
  if (!genre) {
    return res.status(400).send('The given genre ID does not exist.');
  }

  const movie = await Movie.create({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  return res.send(movie);
};

exports.updateMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  // Que pasa si en req.body.genreId paso algo que no sea un MongoObjectId???
  if (!genre) {
    return res.status(400).send('The given genre ID does not exist.');
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true, useFindAndModify: false },
  );

  if (!movie) {
    return res.status(404).send('The movie with the given ID was not found.');
  }

  return res.send(movie);
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id, { useFindAndModify: false });
  if (!movie) {
    return res.status(404).send('The movie with the given ID was not found.');
  }

  return res.status(204).send({ state: 'success', data: null });
};
