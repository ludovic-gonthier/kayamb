'use strict';

var http = require('http'),
  express = require('express'),
  morgan = require('morgan'),
  database = require('./database'),
  config = require('./config');

/**
 * Application declaration
 */
var app = express();

exports.start = function start() {
  app.listen(
    process.env.PORT || config.get('server:port'),
    process.env.ADRESS || config.get('server:hostname')
  );
};

/*
 * Middleware declaration
 */
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(require('./routes'));
app.use(require('connect-livereload')());

/*
 * Shut down the application gracefully
 */
app.on('close', function () {
  database.disconnect();
});

process.on('SIGTERM', function () {
  console.log("Shutting down application...");

  app.close();
});
