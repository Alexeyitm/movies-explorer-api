const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV_URL } = require('./utils/config');

const app = express();
app.use(express.json());

const { PORT = 3000, NODE_ENV, MONGO_PROD_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD_URL : MONGO_DEV_URL, {});

app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
//app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
