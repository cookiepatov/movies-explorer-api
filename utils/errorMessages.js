const notFound = 'Такой страницы не существует';
const wrongPassOrEmail = 'Неправильная почта или пароль';
const alreadyExistsUser = 'Пользователь с таким email уже зарегистрирован';
const alreadyExistsMovie = 'Фильм с таким id уже существует';
const cantDeleteSomebodyMovie = 'Попытка удалить чужой фильм';
const movieNotFound = 'Фильм по указанному _id не найден';
const userNotFound = 'Пользователь по указанному _id не найден';
const notAuthentified = 'Не пройдена аутентификация: отсутствует токен или хэдер авторизации';
const wrongCredentials = 'Не пройдена аутентификация: неверный токен';
const wrongId = 'Передан некорректный _id';
const wrongFieldData = 'Некорректно заполнено поле ';
const serverError = 'На сервере произошла ошибка';

module.exports = {
  notFound,
  wrongPassOrEmail,
  alreadyExistsUser,
  alreadyExistsMovie,
  cantDeleteSomebodyMovie,
  movieNotFound,
  userNotFound,
  notAuthentified,
  wrongCredentials,
  wrongId,
  wrongFieldData,
  serverError,
};
