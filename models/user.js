const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const AuthError = require('../utils/customErrors/AuthError');
const { wrongPassOrEmail } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(wrongPassOrEmail));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(wrongPassOrEmail));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
