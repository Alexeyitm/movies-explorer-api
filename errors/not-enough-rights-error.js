const { NOT_ENOUGH_RIGHTS_ERROR } = require('../utils/constants');

class NotEnoughRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_ENOUGH_RIGHTS_ERROR;
  }
}

module.exports = NotEnoughRightsError;
