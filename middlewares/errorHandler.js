const { serverError } = require('../utils/errorMessages');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  const status = err.statusCode || 500;
  const message = err.statusCode ? err.message : serverError;
  res.status(status).json({ message });
};
