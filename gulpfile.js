// Include Gulp && BrowserSync
var gulp          = require('gulp'),
    browserSync   = require('browser-sync');

// Include gulp plugins
var autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    uglify        = require('gulp-uglify'),
    cssnano       = require('gulp-cssnano'),
    uncss         = require('gulp-uncss');

var reload        = browserSync.reload;

// App Path
var dir = {
  app:    'app/',
  css:    'app/styles/',
  scss:   'app/scss/',
  js:     'app/scripts/',
  html:   'app/**/*.html'
};

// Report/Notify SCSS Errors
var reportError = function (error) {
  console.error('TASK:' + ' ' + error.plugin + '\nPROB:' + ' ' + error.message + '\n');
  this.emit('end');
}

// Compile SCSS
gulp.task('scss', function(){
  return gulp.src(dir.scss + 'styles.scss')
    .pipe(plumber({errorHandler: reportError}))
    .pipe(sass({sourceComments: true}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dir.css));
});

// Compile and Minify SCSS
gulp.task('scss-min', function(){
  return gulp.src(dir.scss + 'styles.scss')
    .pipe(plumber({errorHandler: reportError}))
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(uncss({
      html: ['app/index.html']
    }))
    //.pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(dir.css));
});

// Uglify JS
gulp.task('uglify', function(){
  return gulp.src(dir.js + '*.js')
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dir.js));
});

// Minify CSS and JS
gulp.task('min', ['scss-min', 'uglify']);

// Watch files for changes & reload
gulp.task('watch', ['scss'], function () {
  browserSync({
    open: false,
    notify: true,
    logPrefix: 'WSK',
    server: {
      baseDir: dir.app,
      index: "index.html"
    },
    port: 8080,
    browser: "google chrome"
  });

  gulp.watch([dir.app + '**/*.*'], ['scss', reload]);
});

// Default task - run all the other tasks
gulp.task('default', ['scss', 'watch']);