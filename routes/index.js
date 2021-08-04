const router = require('express').Router();
const { auth } = require('../middlewares');
const users = require('./users');
const movies = require('./movies');
const signin = require('./signin');
const signup = require('./signup');

const NotFoundError = require('../utils/customErrors/NotFoundError');
const { notFound } = require('../utils/errorMessages');

router.use('/signin', signin);
router.use('/signup', signup);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use(auth, () => {
  throw new NotFoundError(notFound);
});

module.exports = router;
