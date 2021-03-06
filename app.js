var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var books = require('./routes/books');
var routes = require('./routes/index');
var users = require('./routes/users');

mongoose.connect('mongodb://wolly:41501art@ds015859.mlab.com:15859/jwtauth',{user: 'jwtauth', pass: '1111' });

//mongoose.connect('mongodb://localhost/jwtauth');

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
});

var app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/bower_components')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/', routes);
app.use('/books', books);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
