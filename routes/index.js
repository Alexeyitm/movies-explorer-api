const router = require('express').Router();
const { validateUser, validateAuth } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND_PAGE_MESSAGE } = require('../utils/constants');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateAuth, login);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('/*', auth, () => {
  throw new NotFoundError(NOT_FOUND_PAGE_MESSAGE);
});

module.exports = router;
