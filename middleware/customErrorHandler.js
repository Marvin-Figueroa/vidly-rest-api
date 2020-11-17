const winston = require('winston');

// Esta funcion sustituye al errorHandler que usa express
// por defecto y solo se encarga de manejar errores que
// ocurren durante el reques-response processing pipeline
module.exports = (err, req, res, next) => {
  // The exception should be logged first
  winston.error(err.message, err);
  res.status(500).send('Something went wrong.');
};
