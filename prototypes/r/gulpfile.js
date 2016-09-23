var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    staticHash = require('gulp-static-hash')

gulp.task('js', function () {
  var b = browserify({
    entries: './js/main.js',
    debug: true,
  })

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
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
    gulp.src('*.html')
        .pipe(staticHash({asset: 'static'}))
        .pipe(gulp.dest(''))
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['sass', 'html'])
  gulp.watch('./js/*.js', ['js', 'html'])
})

gulp.task('default', ['webserver', 'watch'])
