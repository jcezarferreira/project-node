
const { Strategy } = require('passport-http-bearer');
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const exception = require('../exception');

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

const authenticate = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, token) => {
    if (err) next(err);

    if (!token) next(new exception.Unauthorized());

    req.token = token;
    return next();
  })(req, res, next);
};

const getToken = (user) => {
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return token;
};

const setPassportStrategy = (passportContext) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
    secretOrKey: JWT_SECRET,
  };

  passportContext.use(new Strategy(options, (req, jwtPayload, done) => {
    const decoded = jwt.verify(jwtPayload, JWT_SECRET);

    try {
      if (!decoded) { throw new exception.Unauthorized(); }
      done(null, jwtPayload);
    } catch (error) {
      done(exception.getKnownError(error), false);
    }
  }));
};

module.exports = { authenticate, getToken, setPassportStrategy };
