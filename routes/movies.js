const { celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');
const { idParamValidation, createMovieValidation } = require('../utils/serverValidation');

router.get('/', getMovies);
router.delete('/:id', celebrate(idParamValidation), deleteMovieById);
router.post('/', celebrate(createMovieValidation), createMovie);

module.exports = router;
