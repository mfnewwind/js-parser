'use strict';
/*jslint node: true */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var istanbul = require('gulp-istanbul');

var JS_FILES = ['lib/**/*.js', 'test/**/*.js', '*.js'];

gulp.task('lint', function () {
  return gulp.src(JS_FILES)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('coverage', function (cb) {
  var mochaErr;
  
  gulp.src('lib/**/*.js')
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['test/**/*-test.js'])
        .pipe(mocha())
        .on('error', function (err) {
          mochaErr = err;
          this.emit('end');
        })
        .pipe(istanbul.writeReports())
        .once('end', function () {
          cb(mochaErr);
        });
    });
});

gulp.task('test', ['lint', 'coverage']);

gulp.task('watch', ['default'], function () {
  gulp.watch(JS_FILES, ['lint']);
});

gulp.task('default', ['lint']);
