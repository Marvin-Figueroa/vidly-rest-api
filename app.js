const express = require('express');
const genresRouter = require('./routes/genreRoutes');
const customersRouter = require('./routes/customerRoutes');
const moviesRouter = require('./routes/movieRoutes');
const rentalsRouter = require('./routes/rentalRoutes');
const usersRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
