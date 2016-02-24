var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.{html,jpg}')
    .pipe(gulp.dest('build'));
});

gulp.task('prism', function () {
  return gulp.src([
    'bower_components/prism/prism.js',
    'bower_components/prism/components/*.min.js'
  ]).pipe(concat('prism.pack.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('default', ['sass', 'copy']);