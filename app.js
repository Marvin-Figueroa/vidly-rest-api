const express = require('express');
const genresRouter = require('./routes/genreRoutes');
const customersRouter = require('./routes/customerRoutes');

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

module.exports = app;
