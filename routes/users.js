const { celebrate } = require('celebrate');
const router = require('express').Router();

const {
  updateProfile, getCurrentUserInfo,
} = require('../controllers/users');
const {
  changeProfileValidation,
} = require('../utils/serverValidation');

router.get('/me', getCurrentUserInfo);
router.patch('/me', celebrate(changeProfileValidation), updateProfile);

module.exports = router;
