const { USER_FOUND_ERROR } = require('../utils/constants');

class UserFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_FOUND_ERROR;
  }
}

module.exports = UserFoundError;
