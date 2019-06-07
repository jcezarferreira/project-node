const serverless  = require('serverless-http');
const express     = require('express');
const uuidv1      = require('uuid/v1');
const bodyParser  = require('body-parser');

const app         = express();
const handlers    = require('./config/middleware');

const router      = express.Router();
const routes      = require('./routes');
const connection  = require('./config/connection');

let conn = null;

routes(router);

app.use((req, res, next) => {
  try {
    conn = connection.generate(conn);
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(bodyParser.json());
app.use(handlers.enableCors);
app.use('/', router);
app.use(handlers.notFound);
app.use(handlers.serverError);

module.exports.server = serverless(app, {
  request: function (request, event) {
    request.context = event.requestContext;
    request.id = uuidv1();
  }
});
