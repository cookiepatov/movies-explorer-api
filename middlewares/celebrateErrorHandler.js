const IncorrectDataError = require('../utils/customErrors/IncorrectDataError');
const { wrongFieldData, wrongId } = require('../utils/errorMessages');

module.exports = (err, req, res, next) => {
  if (err.message === 'celebrate request validation failed') {
    if (err.details.get('params')) {
      throw new IncorrectDataError(wrongId);
    }
    const object = err.details.get('body').details[0].path[0];
    throw new IncorrectDataError(wrongFieldData + object);
  }
  next(err);
};
