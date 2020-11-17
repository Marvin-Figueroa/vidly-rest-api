const winston = require('winston');
const app = require('./app');
require('dotenv').config();
require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();

//  Starting the Server
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server listening on port ${port}`));
