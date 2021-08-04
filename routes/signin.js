const { celebrate } = require('celebrate');
const router = require('express').Router();

const { login } = require('../controllers/users');
const { loginValidation } = require('../utils/serverValidation');

router.post('/', celebrate(loginValidation), login);

module.exports = router;
