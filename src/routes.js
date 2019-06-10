
const userController = require('./controllers/user-controller');
const { authenticate } = require('./jwt/functions');

module.exports = (router) => {
  router.get('/online', (req, res) => res.json(new Date()));

  router.get('/user/:id', authenticate, userController.findById);

  router.post('/signin', userController.signIn);

  router.post('/signup', userController.signUp);
};
