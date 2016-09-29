var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel')

gulp.task('js', function () {
  var b = browserify({
    entries: './js/main.js',
    debug: false,
  })

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(babel())
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload())
})

gulp.task('sass', function () {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(connect.reload())
})

gulp.task('html', function () {

})

gulp.task('images', function () {
  gulp.src('assets/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/assets/'))
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch('scss/*.scss', ['sass', 'html'])
  gulp.watch('js/*.js', ['js', 'html'])
  gulp.watch('assets/*', ['images'])
})

gulp.task('default', ['webserver', 'watch'])
