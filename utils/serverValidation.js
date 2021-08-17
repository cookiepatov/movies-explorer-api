const { Joi } = require('celebrate');

const validator = require('validator');

const idParamValidation = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const createMovieValidation = {
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).max(100),
    nameRU: Joi.string().required().min(2).max(100),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено некорректно');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailer заполнено некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено некорректно');
    }),
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(2).max(10),
    description: Joi.string().required().min(2).max(10000),
    movieId: Joi.number().required(),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
};

const changeProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports = {
  idParamValidation,
  createMovieValidation,
  createUserValidation,
  changeProfileValidation,
  loginValidation,
};
