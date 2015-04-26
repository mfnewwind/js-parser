'use strict';
/*jslint node: true */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

var JS_FILES = ['lib/**/*.js', 'test/**/*.js', '*.js'];

gulp.task('mocha', function () {
  return gulp.src('test/**/*-test.js')
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', function () {
  return gulp.src(JS_FILES)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('test', ['lint', 'mocha']);

gulp.task('watch', ['default'], function () {
  gulp.watch(JS_FILES, ['lint']);
});

gulp.task('default', ['lint']);
