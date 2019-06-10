const serverless = require('serverless-http');
const uuidv1 = require('uuid/v1');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const router = express.Router();

const handlers = require('./config/middleware');
const routes = require('./routes');
const jwtFunctions = require('./jwt/functions');

routes(router);

app.use(bodyParser.json());
app.use(handlers.enableCors);
app.use(handlers.createConnection);
app.use('/', router);
app.use(handlers.notFound);
app.use(handlers.serverError);
app.use(passport.initialize());
app.use(passport.session());

jwtFunctions.setPassportStrategy(passport);

module.exports.server = serverless(app, {
  request: (request, event) => {
    request.context = event.requestContext;
    request.id = uuidv1();
  },
});

module.exports.app = app;
