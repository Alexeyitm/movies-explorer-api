const INCORRECT_DATA_ERROR = 400;
const LOGIN_DATA_ERROR = 401;
const NOT_ENOUGH_RIGHTS_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const USER_FOUND_ERROR = 409;
const SERVER_ERROR = 500;

const LOGIN_DATA_ERROR_MESSAGE = 'Необходима авторизация!';
const INCORRECT_LOGIN_DATA_MESSAGE = 'Неправильные почта или пароль!';
const SERVER_ERROR_MESSAGE = 'Ошибка сервера!';
const NOT_FOUND_PAGE_MESSAGE = 'К сожалению, запрашиваемая страница не найдена.';
const NOT_FOUND_MOVIES_MESSAGE = 'К сожалению, фильмы не найдены.';
const NOT_FOUND_MOVIE_MESSAGE = 'К сожалению, фильм не найдены.';
const NOT_FOUND_USER_MESSAGE = 'К сожалению, пользователь по указанному id не найден.';
const INCORRECT_DATA_MOVIE_MESSAGE = 'К сожалению, переданы некорректные данные при создании фильма.';
const INCORRECT_DATA_USER_MESSAGE = 'К сожалению, переданы некорректные данные пользователя.';
const INCORRECT_MOVIEID_MESSAGE = 'К сожалению, передан некорректный id фильма.';
const USER_FOUND_MESSAGE = 'К сожалению, передан некорректный id фильма.';
const NOT_RIGHTS_DELETE_MOVIE_MESSAGE = 'К сожалению, нельзя удалить фильм добавленный другим пользователем.';

const INCORRECT_IMAGE_MESSAGE = 'Поле image заполнено некорректно.';
const INCORRECT_TRAILERLINK_MESSAGE = 'Поле trailerLink заполнено некорректно.';
const INCORRECT_THUMBNAIL_MESSAGE = 'Поле thumbnail заполнено некорректно.';

module.exports = {
  INCORRECT_DATA_ERROR,
  LOGIN_DATA_ERROR,
  NOT_ENOUGH_RIGHTS_ERROR,
  NOT_FOUND_ERROR,
  USER_FOUND_ERROR,
  SERVER_ERROR,
  LOGIN_DATA_ERROR_MESSAGE,
  INCORRECT_LOGIN_DATA_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_PAGE_MESSAGE,
  NOT_FOUND_MOVIES_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_DATA_MOVIE_MESSAGE,
  INCORRECT_DATA_USER_MESSAGE,
  INCORRECT_MOVIEID_MESSAGE,
  USER_FOUND_MESSAGE,
  NOT_RIGHTS_DELETE_MOVIE_MESSAGE,
  INCORRECT_IMAGE_MESSAGE,
  INCORRECT_TRAILERLINK_MESSAGE,
  INCORRECT_THUMBNAIL_MESSAGE,
};
