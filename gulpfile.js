(function () {
  'use strict';

  var gulp = require('gulp'),
    jslint = require('gulp-jslint'),
    server = require('gulp-express'),
    mocha = require('gulp-mocha'),
    config = require('./config');

  gulp.task('lint', function () {
    return gulp.src(['app.js', 'gulpfile.js', '{app,controllers,routes}/**/*.js'])
      .pipe(jslint(config.get('jslint')))
      .on('error', function (error) {
        console.error(String(error));
      });
  });

  gulp.task('server', function () {
    server.run(['app.js']);

    gulp.watch(['app.js', '{app,controllers,routes}/**/*.js'], [server.run]);
  });

  gulp.task('test', function () {
    return gulp.src(['test/**.js'], { read: false })
      .pipe(mocha(config.get('mocha')))
      .on('error', function (error) {
        console.error(String(error));
      });
  });

}());
