const { JWT_SECRET, NODE_ENV } = process.env;

const jwt = require('jsonwebtoken');
const AuthError = require('../utils/customErrors/AuthError');
const { defaultJWTSecret } = require('../utils/constants');
const { notAuthentified, wrongCredentials } = require('../utils/errorMessages');

module.exports = (req, res, next) => {
  /* if (!req.cookies || !req.cookies.jwt) {
    throw new AuthError('Не пройдена аутентификация: отсутствует куки или токен');
  }

  const token = req.cookies.jwt;
 */
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(notAuthentified);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : defaultJWTSecret);
  } catch (err) {
    throw new AuthError(wrongCredentials);
  }

  req.user = payload;
  next();
};
