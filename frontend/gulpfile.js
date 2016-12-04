var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var Server = require('karma').Server;

// custom middleware vars to handle the dev routing for browser-sync
var fs = require("fs");
var path = require("path");
var url = require("url");
var defaultFile = "index.html";
var folder = path.resolve(__dirname, "app/");

var APP_PATH = './app/';
var DIST_PATH = './dist/';
var VERSION = 'angular';


/*=========================================
=            APP BUILD RELATED            =
=========================================*/

gulp.task('clean', shell.task([
  'rm -rf ' + DIST_PATH
]));

gulp.task('jshint', function() {
  return gulp.src(
    [
      APP_PATH + 'components/**/*.js',
      APP_PATH + 'core/**/*.js',
      APP_PATH + 'directives/**/*.js',
      APP_PATH + 'filters/**/*.js',
      APP_PATH + 'services/**/*.js',
      APP_PATH + 'app.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify_index', ['copy'], function() {
  return gulp.src(APP_PATH + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('minify_tpls', ['copy'], function() {
  return gulp.src(DIST_PATH + 'assets/'+VERSION+'/tpls/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DIST_PATH + 'assets/'+VERSION+'/tpls/'));
});

gulp.task('minify-css', ['copy'], function() {
  return gulp.src(DIST_PATH + 'assets/'+VERSION+'/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(DIST_PATH + 'assets/'+VERSION+'/styles'));
});

gulp.task('sass', function () {
  return gulp.src(APP_PATH + 'styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(APP_PATH + '/assets/'+VERSION+'/styles'));
});

gulp.task('copy', ['clean', 'browserify', 'sass'], shell.task([
  'mkdir -p ' + DIST_PATH + 'assets/' + VERSION,
  'cp -R ' + APP_PATH + 'assets' + ' ' + DIST_PATH,
  //'cp -R ' + APP_PATH + 'index.html' + ' ' + DIST_PATH,
  //'cp ' + APP_PATH + 'assets/'+ VERSION +'/app.js' + ' ' + DIST_PATH
]));



/*===================================
=            DEV RELATED            =
===================================*/

gulp.task('sass:watch', function () {
  gulp.watch(APP_PATH + '/styles/**/*.scss', {debounceDelay: 1000}, ['sass', reload]);
});

gulp.task('js:watch', function () {
  gulp.watch([
    '*.js',
    'components/**/*.js',
    'services/**/*.js',
    'filters/**/*.js',
    'directives/**/*.js',
    'core/**/*.js'
    ],
    {cwd: 'app', debounceDelay: 2000 }, ['dev_browserify', reload]);
});

gulp.task('dev_browserify', ['jshint'], function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: APP_PATH + '/app.js',
    debug: true,
    fast: true,
    noparse: [
    './node_modules/**/*.js'
    ]
  });

  var dest = APP_PATH + '/assets/' + VERSION;
  return b.transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
});

gulp.task('browserify', ['jshint'], function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: APP_PATH + '/app.js',
    debug: true
  });

  var dest = APP_PATH + '/assets/' + VERSION;
  return b.transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
});

gulp.task('serve', ['default', 'sass:watch', 'js:watch'], function() {
  browserSync({

    server: {
      baseDir: 'app',
      middleware: function(req, res, next) {
          var fileName = url.parse(req.url);
          fileName = fileName.href.split(fileName.search).join("");
          var fileExists = fs.existsSync(folder + fileName);
          if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
              req.url = "/" + defaultFile;
          }
          return next();
      }
    }
  });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['jshint', 'sass', 'dev_browserify']);

gulp.task('build', ['copy', 'minify_tpls', 'minify_index', 'minify-css']);