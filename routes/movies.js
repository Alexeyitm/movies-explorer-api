const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const validator = require('validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const {
  INCORRECT_IMAGE_MESSAGE,
  INCORRECT_TRAILERLINK_MESSAGE,
  INCORRECT_THUMBNAIL_MESSAGE,
} = require('../utils/constants');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INCORRECT_IMAGE_MESSAGE);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INCORRECT_TRAILERLINK_MESSAGE);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INCORRECT_THUMBNAIL_MESSAGE);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
