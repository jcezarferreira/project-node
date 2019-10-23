const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const createConnection = require('./middleware/create-connection');
const notFound = require('./middleware/not-found');
const serverError = require('./middleware/server-error');

const { configuration } = require('./config/jwt-configuration');

const app = express();

const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(cors());
app.use(createConnection);
app.use('/', configuration.unless({ path: ['/online', '/user/signin', '/user/signup'] }), routes);
app.use(notFound);
app.use(serverError);

module.exports.app = app;
