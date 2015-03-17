'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var glob = require('glob');

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('build-js', function() {

  var bundler = browserify({
    entries: ['./src/app.js'],
    debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('build-css', function () {
  gulp.src('../scss/*package.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../css/dist'));
});

gulp.task('watch', function () {
  watch('../scss/**/*.scss', function () {
    gulp.start('build-css');
  });

  watch(['src/**/*.js'], function () {
    gulp.start('build-js');
  });
});