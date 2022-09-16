require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV_URL } = require('./utils/config');

const { PORT = 3000, NODE_ENV, MONGO_PROD_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD_URL : MONGO_DEV_URL, {});

const app = express();

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
