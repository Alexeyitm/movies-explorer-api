const express = require('express');
const mongoose = require('mongoose');
const { validateUser, validateAuth } = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {});

app.post('/signup', validateUser, createUser);
app.post('/signin', validateAuth, login);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use('/*', auth, () => {
  throw new NotFoundError('К сожалению, запрашиваемая страница не найдена.');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
