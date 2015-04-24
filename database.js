'use strict';

var database = require('mongoose'),
  app = require('./app'),
  config = require('./config');

module.exports = database;

database.connect(config.get('database:url'));
database.connection.on('error', function (error) {
  throw error;
});
database.connection.once('open', function () {
  console.log("Database connection established at %s", config.get('database:url'));

  app.start();
});
