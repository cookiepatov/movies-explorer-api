const { Joi } = require('celebrate');

const urlRegexp = /http[s]{0,1}:\/\/(www\.){0,1}[\w\-.~:/?#[\]@!$&'()*+,;=]{5,}/i;

const idParamValidation = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const createMovieValidation = {
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).max(100),
    nameRU: Joi.string().required().min(2).max(100),
    image: Joi.string().required().regex(urlRegexp),
    trailer: Joi.string().required().regex(urlRegexp),
    thumbnail: Joi.string().required().regex(urlRegexp),
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(2).max(10),
    description: Joi.string().required().min(2).max(1000),
    movieId: Joi.number().required(),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
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
