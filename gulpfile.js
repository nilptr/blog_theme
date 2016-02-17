var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.{html,jpg}')
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'copy']);