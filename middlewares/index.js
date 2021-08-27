const auth = require('./auth');
const celebrateErrorHandler = require('./celebrateErrorHandler');
const cors = require('./cors');
const errorHandler = require('./errorHandler');
const logger = require('./logger');
const rateLimiter = require('./rate-limiter');

module.exports = {
  auth, celebrateErrorHandler, cors, errorHandler, logger, rateLimiter,
};
