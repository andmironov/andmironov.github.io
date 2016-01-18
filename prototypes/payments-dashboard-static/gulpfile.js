var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

gulp.task('js', function () {
  var b = browserify({
    entries: './js/main.js',
    debug: true,
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['webserver', 'watch']);
