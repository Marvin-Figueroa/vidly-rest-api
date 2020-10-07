const express = require('express');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
require('dotenv').config();
const mongoose = require('mongoose');
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

//  Connecting to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.daqap.mongodb.net/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(dbDebugger('Successfully connected to MongoDB.'))
  .catch((err) => dbDebugger('Connection to MongoDB failed:', err.message));

//  Starting the Server
const port = process.env.PORT || 5000;
app.listen(port, () => startupDebugger(`Server listening on port ${port}`));
