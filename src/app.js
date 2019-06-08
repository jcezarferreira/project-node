const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');

dotenv.config();

const app = express();
const handlers = require('./config/middleware');

const router = express.Router();
const routes = require('./routes');
const jwtFunctions = require('./jwt/functions');

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

app.listen(process.env.PORT, () => console.log('App is running'));

module.exports = app;
