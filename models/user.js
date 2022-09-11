const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const LoginDataError = require('../errors/login-data-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new LoginDataError('Неправильные почта или пароль!');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new LoginDataError('Неправильные почта или пароль!');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
