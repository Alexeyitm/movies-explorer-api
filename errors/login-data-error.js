const { LOGIN_DATA_ERROR } = require('../utils/constants');

class LoginDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = LOGIN_DATA_ERROR;
  }
}

module.exports = LoginDataError;
