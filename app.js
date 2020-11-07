var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// config env vars
require('dotenv').config();

// env vars
const { MONGO_URL } = require('./constants');

// start mongo and connect
const mongoose = require('mongoose');
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register.router');
var loginRouter = require('./routes/login.router');

const loginValidator = require('./validators/login.validator');
const registerValidator = require('./validators/register.validator');
const jwtValidator = require("./validators/jwt.validator");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// validators

app.use('/', jwtValidator, indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerValidator ,registerRouter);
app.use("/login", loginValidator, loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
