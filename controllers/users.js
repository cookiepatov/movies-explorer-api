const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AlreadyExistsError = require('../utils/customErrors/AlreadyExistsError');
const NotFoundError = require('../utils/customErrors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).catch(next)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })
      .then(({
        name, email,
      }) => res.send({
        name, email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new AlreadyExistsError('Пользователь с таким email уже зарегистрирован'));
        } else {
          next(err);
        }
      }));
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true, upsert: false },
  ).orFail(() => { throw new NotFoundError('Пользователь по указанному _id не найден'); })
    .then((answer) => {
      const {
        _id, name, email,
      } = answer;
      res.send({
        _id, name, email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      /* res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' }); */

      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id).orFail(() => { throw new NotFoundError('Пользователь по указанному _id не найден'); })
    .then(({
      _id, name, email,
    }) => {
      res.send({
        _id, name, email,
      });
    })
    .catch(next);
};
