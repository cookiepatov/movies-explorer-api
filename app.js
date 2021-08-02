const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const {
  auth, cors, errorHandler, logger, celebrateErrorHandler, rateLimiter,
} = require('./middlewares');

const { requestLogger, errorLogger } = logger;
const { users, movies } = require('./routes');

const { login, createUser } = require('./controllers/users');

const NotFoundError = require('./utils/customErrors/NotFoundError');
const { notFound } = require('./utils/errorMessages');
const { mongoUrl, serverStartsMes, defaultPort } = require('./utils/constants');
const { loginValidation, createUserValidation } = require('./utils/serverValidation');

const { PORT = defaultPort } = process.env;
const app = express();

app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors);

app.use(requestLogger);

app.use(helmet());

app.post('/signin', celebrate(loginValidation), login);
app.post('/signup', celebrate(createUserValidation), createUser);

app.use('/users', auth, users);
app.use('/movies', auth, movies);

app.use(() => {
  throw new NotFoundError(notFound);
});

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(serverStartsMes);
});
