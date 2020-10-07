// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

//  Starting the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

//  Connecting to MongoDB
mongoose
  .connect(
    process.env.LOCALHOST_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.log('Could not connect to MongoDB.', err.message));
