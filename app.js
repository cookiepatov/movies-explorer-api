const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

require('dotenv').config();

const {
  /* cors,  */errorHandler, logger, celebrateErrorHandler, rateLimiter,
} = require('./middlewares');

const { requestLogger, errorLogger } = logger;
const router = require('./routes');

const { defaultMongoUrl, serverStartsMes, defaultPort } = require('./utils/constants');

const { PORT = defaultPort, MONGO_URL = defaultMongoUrl } = process.env;

const app = express();

app.use(requestLogger);
app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

/* app.use(cors); */

app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(serverStartsMes);
});
