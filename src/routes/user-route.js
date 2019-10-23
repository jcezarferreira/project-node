const {
  findById,
  signIn,
  signUp,
  findAll,
} = require('../controllers/user-controller');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', findAll);

  router.get('/:_id', findById);

  router.post('/signin', signIn);

  router.post('/signup', signUp);

  return router;
};
