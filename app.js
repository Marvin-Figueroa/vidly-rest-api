const express = require('express');
const genresRouter = require('./routes/genreRoutes');
const customersRouter = require('./routes/customerRoutes');
const moviesRouter = require('./routes/movieRoutes');

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);

module.exports = app;
