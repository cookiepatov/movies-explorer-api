const AlreadyExistsError = require('./AlreadyExistsError');
const AuthError = require('./AuthError');
const IncorrectDataError = require('./IncorrectDataError');
const NoRightsError = require('./NoRightsError');
const NotFoundError = require('./NotFoundError');

module.exports = {
  AlreadyExistsError, AuthError, IncorrectDataError, NoRightsError, NotFoundError,
};
