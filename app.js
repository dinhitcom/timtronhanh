require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');
var session = require('express-session');

//Connect DB
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true});
// var db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var postsRouter = require('./routes/posts');
var contactRouter = require('./routes/contact');
// var adminlte = require('admin-lte-express');

var app = express();
 // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
// view engine setup    
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter); 
//app.use('/search', searchRouter);
app.use('/admin', adminRouter);
app.use('/posts', postsRouter);
// app.use('/contact', contactRouter);
// app.use('/login',loginRouter);

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
