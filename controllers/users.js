const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const SendIncorrectDataError = require('../errors/send-incorrect-data-error');
const UserFoundError = require('../errors/user-found-error');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SendIncorrectDataError('К сожалению, переданы некорректные данные при создании пользователя.'));
        return;
      }
      if (err.code === 11000) {
        next(new UserFoundError('К сожалению, пользователь c таким email уже существует.'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('К сожалению, пользователь по указанному id не найден.');
    })
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SendIncorrectDataError('К сожалению, переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};
