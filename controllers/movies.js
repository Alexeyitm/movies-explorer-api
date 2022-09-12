const Movie = require('../models/movie');
const SendIncorrectDataError = require('../errors/send-incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');
const NotEnoughRightsError = require('../errors/not-enough-rights-error');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError('К сожалению, фильмы не найдены.');
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
        next(new SendIncorrectDataError('К сожалению, переданы некорректные данные при создании карточки фильма.'));
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
      throw new NotFoundError('К сожалению, карточка с указанным id не найдена.');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.valueOf()) {
        throw new NotEnoughRightsError('К сожалению, нельзя удалить чужую карточку');
      }
      return movie.remove();
    })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SendIncorrectDataError('К сожалению, передан некорректный id карточки'));
        return;
      }
      next(err);
    });
};
