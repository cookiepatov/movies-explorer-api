const { celebrate } = require('celebrate');
const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { createUserValidation } = require('../utils/serverValidation');

router.post('/', celebrate(createUserValidation), createUser);

module.exports = router;
