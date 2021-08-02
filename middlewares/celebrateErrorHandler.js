const IncorrectDataError = require('../utils/customErrors/IncorrectDataError');

module.exports = (err, req, res, next) => {
  if (err.message === 'celebrate request validation failed') {
    if (err.details.get('params')) {
      throw new IncorrectDataError('Передан некорректный _id');
    }
    const object = err.details.get('body').details[0].path[0];
    throw new IncorrectDataError(`Некорректно заполнено поле ${object}`);
  }
  next(err);
};
