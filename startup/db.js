const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  mongoose
    .connect(process.env.REMOTE_DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(winston.info('Successfully connected to MongoDB.'));
};
