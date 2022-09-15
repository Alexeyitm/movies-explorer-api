const { INCORRECT_DATA_ERROR } = require('../utils/constants');

class SendIncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INCORRECT_DATA_ERROR;
  }
}

module.exports = SendIncorrectDataError;
