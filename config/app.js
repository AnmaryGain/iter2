let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let bodyParser = require('body-parser');
let localStrategy = require('passport-local').Strategy;
let session = require('express-session');

// database setup
let mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

var app = express();

app.use(session({
  secret: "somesecret",
  saveUninitialized: false, 
  resave: false
}))

//the passport stuff
let userModel = require('../models/users.js');
let User = userModel.User;

passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

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
