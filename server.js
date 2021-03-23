const express = require('express');
const winston = require('winston');
const app = express();

// winston logging transport
require('./startup/logger')();
//connect Database
require('./startup/db')();
//Routes
require('./startup/routes')(app);
// Throw error if jwtSecret is not present
require('./startup/config')();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => winston.info(`Server started at port ${PORT}`));
