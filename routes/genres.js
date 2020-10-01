const express = require('express');
const Joi = require('joi');

const router = express.Router();

const genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Sci-Fi' },
  { id: 5, name: 'Horror' },
];

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required().trim(),
  });

  return schema.validate(genre);
}

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id, 10));

  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id, 10));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find((gen) => gen.id === parseInt(req.params.id, 10));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const genreIndex = genres.indexOf(genre);
  genres.splice(genreIndex, 1);

  res.send(genre);
});

module.exports = router;