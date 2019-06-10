const serverless = require('serverless-http');
const uuidv1 = require('uuid/v1');

const { app } = require('./src/app');

module.exports.server = serverless(app, {
  request: (request, event) => {
    request.context = event.requestContext;
    request.id = uuidv1();
  },
});
