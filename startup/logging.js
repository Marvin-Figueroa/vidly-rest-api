const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
  // Configuring the default logger by adding transports to it
  winston.add(
    new winston.transports.File({
      filename: 'logfile.log',
      handleExceptions: true,
      handleRejections: true,
      level: 'info',
    })
  );
  winston.add(
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: process.env.REMOTE_DB_URL,
      level: 'info',
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
