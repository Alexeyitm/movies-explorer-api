const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATA_BASE } = require('./utils/config');

const app = express();

const { PORT = 3500 } = process.env;

mongoose.connect(DATA_BASE, {});

app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
