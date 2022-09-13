const jwt = require('jsonwebtoken');
const LoginDataError = require('../errors/login-data-error');

const { NODE_ENV, JWT_PROD_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginDataError('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_PROD_KEY : 'dev-secret');
  } catch (err) {
    throw new LoginDataError('Необходима авторизация!');
  }
  req.user = payload;
  next();
  return null;
};
