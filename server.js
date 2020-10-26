// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

// Verificando que process.env.JWT_PRIVATE_KEY este definida
if (!process.env.JWT_PRIVATE_KEY) {
  console.log('FATAL ERROR: process.env.JWT_PRIVATE_KEY is not defined.');
  process.exit(1);
}

//  Starting the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

//  Connecting to MongoDB
mongoose
  .connect(process.env.REMOTE_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.log('Could not connect to MongoDB.', err.message));
