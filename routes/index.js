const router = require('express').Router();
const { validateUser, validateAuth } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateAuth, login);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('/*', auth, () => {
  throw new NotFoundError('К сожалению, запрашиваемая страница не найдена.');
});

module.exports = router;
