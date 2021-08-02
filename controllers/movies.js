const Movie = require('../models/movie');
const NoRightsError = require('../utils/customErrors/NoRightsError');
const NotFoundError = require('../utils/customErrors/NotFoundError');
const AlreadyExistsError = require('../utils/customErrors/AlreadyExistsError');
const { cantDeleteSomebodyMovie, movieNotFound, alreadyExistsMovie } = require('../utils/errorMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id).orFail(() => { throw new NotFoundError(movieNotFound); })
    .then((movieInfo) => {
      const {
        owner: movieOwner,
      } = movieInfo;
      if (movieOwner.toString() !== req.user._id) {
        throw new NoRightsError(cantDeleteSomebodyMovie);
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
    .catch((err) => {
      if (err.code === 11000) {
        next(new AlreadyExistsError(alreadyExistsMovie));
      } else {
        next(err);
      }
    });
};
