const Movie = require('../models/movie');
const { NoRightsError, NotFoundError } = require('../utils/customErrors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id).orFail(() => { throw new NotFoundError('Фильм по указанному _id не найдена'); })
    .then((movieInfo) => {
      const {
        owner: movieOwner,
      } = movieInfo;
      if (movieOwner.toString() !== req.user._id) {
        throw new NoRightsError('Попытка удалить чужой фильм');
      } else {
        Movie.findByIdAndRemove(req.params.id)
          .then((answer) => {
            const {
              _id, country, director, nameRU, nameEN, duration, year,
              description, image, trailer, thumbnail, movieId, owner,
            } = answer;
            res.send({
              _id,
              country,
              director,
              nameRU,
              nameEN,
              duration,
              year,
              description,
              image,
              trailer,
              thumbnail,
              movieId,
              owner,
            });
          })
          .catch(next);
      }
    }).catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, nameRU, nameEN, duration, year,
    description, image, trailer, thumbnail, movieId,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    nameRU,
    nameEN,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send({ movie }))
    .catch(next);
};
