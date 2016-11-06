'use strict';
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const ipfilter     = require('express-ipfilter');

const monk = require('monk');
const db = monk('mongodb://localhost:27017/longo');

const routesIdx   = require('./routes/index');
const routesLog   = require('./routes/log');
const routesQuery = require('./routes/query');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// white list the following IPs
const ips = ['127.0.0.1', '::1'];

app.use(ipfilter(ips, {mode: 'allow'}));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/',      routesIdx);
app.use('/log',   routesLog);
app.use('/query', routesQuery);

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
