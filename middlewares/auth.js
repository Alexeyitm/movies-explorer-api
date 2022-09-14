const jwt = require('jsonwebtoken');
const { JWT_DEV_KEY } = require('../utils/config');
const LoginDataError = require('../errors/login-data-error');

const { NODE_ENV, JWT_PROD_KEY } = process.env;

module.exports = (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization) {
    throw new LoginDataError('Необходима авторизация1!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_PROD_KEY : JWT_DEV_KEY,
    );
  } catch (err) {
    throw new LoginDataError('Необходима авторизация2!');
  }
  req.user = payload;
  next();
  return null;
};
