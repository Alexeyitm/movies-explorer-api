const jwt = require('jsonwebtoken');
const { JWT_DEV_KEY } = require('../utils/config');
const LoginDataError = require('../errors/login-data-error');
const { LOGIN_DATA_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_PROD_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new LoginDataError(LOGIN_DATA_ERROR_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_PROD_KEY : JWT_DEV_KEY,
    );
  } catch (err) {
    throw new LoginDataError(LOGIN_DATA_ERROR_MESSAGE);
  }
  req.user = payload;
  next();
  return null;
};
