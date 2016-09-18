var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var ipfilter     = require('express-ipfilter');

var monk = require('monk');
var db = monk('mongodb://localhost:27017/longo');

var routesIdx = require('./routes/index');
var routesLog = require('./routes/log');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// white list the following IPs
var ips = ['127.0.0.1', '::1'];

app.use(ipfilter(ips, {mode: 'allow'}));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/',    routesIdx);
app.use('/log', routesLog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
