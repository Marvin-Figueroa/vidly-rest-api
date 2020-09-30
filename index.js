const express = require('express');
const Joi = require('joi');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.use(express.json());

const genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Sci-Fi' },
  { id: 5, name: 'Horror' },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const genreIndex = genres.indexOf(genre);
  genres.splice(genreIndex, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required().trim(),
  });

  return schema.validate(genre);
}
