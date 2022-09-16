const Movie = require('../models/movie');
const SendIncorrectDataError = require('../errors/send-incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');
const NotEnoughRightsError = require('../errors/not-enough-rights-error');
const {
  NOT_FOUND_MOVIES_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  INCORRECT_DATA_MOVIE_MESSAGE,
  INCORRECT_MOVIEID_MESSAGE,
  NOT_RIGHTS_DELETE_MOVIE_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIES_MESSAGE);
    })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send({ movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SendIncorrectDataError(INCORRECT_DATA_MOVIE_MESSAGE));
        return;
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.valueOf()) {
        throw new NotEnoughRightsError(NOT_RIGHTS_DELETE_MOVIE_MESSAGE);
      }
      return movie.remove();
    })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SendIncorrectDataError(INCORRECT_MOVIEID_MESSAGE));
        return;
      }
      next(err);
    });
};
