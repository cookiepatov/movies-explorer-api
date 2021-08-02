const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AlreadyExistsError = require('../utils/customErrors/AlreadyExistsError');
const NotFoundError = require('../utils/customErrors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id).orFail(() => { throw new NotFoundError('Пользователь по указанному _id не найден'); })
    .then((answer) => {
      const {
        _id, name, about, avatar,
      } = answer;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).catch(next)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then(({
        name, about, email, avatar,
      }) => res.send({
        name, about, email, avatar,
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
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true, upsert: false },
  ).orFail(() => { throw new NotFoundError('Пользователь по указанному _id не найден'); })
    .then((answer) => {
      const {
        _id, name, about, avatar,
      } = answer;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  ).orFail(() => { throw new NotFoundError('Пользователь по указанному _id не найден'); })
    .then((answer) => {
      const {
        _id, name, about, avatar,
      } = answer;
      res.send({
        name, about, avatar, _id,
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
      _id, name, about, avatar, email,
    }) => {
      res.send({
        name, about, avatar, _id, email,
      });
    })
    .catch(next);
};
