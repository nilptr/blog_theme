var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var bower = require('gulp-bower');
var banner = require('gulp-banner');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

var pkg = require('./package.json');

var prism = [
  'core', // core
  'markup', 'handlebars',
  'css', 'css-extras', 'less', 'sass', 'scss',
  'clike', 'c', 'cpp', 'java', // clike -> c -> bison
  'bash', 'sql', 'go', 'rust', 'swift',
  'javascript', 'json', 'jsx',
  'php', 'python'
].map(function (lang) {
  return 'bower_components/prism/components/prism-' + lang + '.js';
});

var comment = [
  '/*!',
  ' * <%= pkg.name %> <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.homepage %>',
  ' *',
  ' * Copyright <%= new Date().getFullYear()%>, <%= pkg.author %>',
  ' * Released under the <%= pkg.license %> license.',
  ' */\n'
].join('\n');

gulp.task('bower', function () {
  return bower();
});

gulp.task('sass', function () {
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(banner(comment, { pkg: pkg }))
    .pipe(gulp.dest('release/assets/css'));
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.{hbs,jpg,svg}')
    .pipe(gulp.dest('release'));
});

gulp.task('prism', ['bower'], function () {
  return gulp.src(prism)
    .pipe(concat('prism.pack.js'))
    .pipe(uglify())
    .pipe(gulp.dest('release/assets/js'));
});

gulp.task('package', function () {
  return gulp.src('package.json')
    .pipe(gulp.dest('release'));
});

gulp.task('default', ['sass', 'copy', 'prism', 'package']);