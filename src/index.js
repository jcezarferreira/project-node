const serverless  = require('serverless-http');
const express     = require('express');
const uuidv1      = require('uuid/v1');
const bodyParser  = require('body-parser');
const passport		= require('passport');

const app         = express();
const handlers    = require('./config/middleware');

const router      = express.Router();
const routes      = require('./routes');
const jwtFunctions 	= require('./jwt/functions');

routes(router);

app.use(bodyParser.json());
app.use(handlers.createConnection);
app.use(handlers.enableCors);
app.use('/', router);
app.use(handlers.notFound);
app.use(handlers.serverError);
app.use(passport.initialize());
app.use(passport.session());
jwtFunctions.setPassportStrategy(passport);

module.exports.server = serverless(app, {
  request: function (request, event) {
    request.context = event.requestContext;
    request.id = uuidv1();
  }
});
