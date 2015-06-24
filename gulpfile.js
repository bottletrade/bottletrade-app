// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp           = require('gulp'),
    rimraf         = require('rimraf'),
    runSequence    = require('run-sequence'),
    $              = require('gulp-load-plugins')(),
    path           = require('path'),
    modRewrite     = require('connect-modrewrite'),
    dynamicRouting = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'client/assets/scss',
  'bower_components/foundation-apps/scss'
];
var appDepJs = [
  'vendor/angular-svg-base/src/svgDirs.js',
  'bower_components/ng-lodash/build/ng-lodash.js'
];
// These files are for your app's JavaScript
var appJS = [
  'client/bottletrade/bottletrade.js',
  'client/bottletrade/**/*.js',
  'client/assets/js/app.js',
  'client/**/*.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {
  var dirs = [
    './client/**/*.*',
    '!./client/bottletrade/**/*.js',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,fonts,js}/**/*.*'
  ];

  // Everything in the client folder except templates, Sass, and JS
  gulp.src(dirs, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'));

  gulp.src('./data/foundation.apps.js')
    .pipe(gulp.dest('./build/assets/js'));

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./build/assets/img/iconic/'));
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./build/assets/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // App JavaScript
  return gulp.src(appDepJs.concat(appJS))
    .pipe($.ngAnnotate())
    /*.pipe($.uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))*/
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('jshint', function() {
  return gulp.src(appJS)
    .pipe($.jshint({
      "globalstrict": true,
      "globals": {
        "angular": false
      }
    }))
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy-templates', ['copy'], function() {
  return gulp.src('./client/templates/**/*.html')
    .pipe(dynamicRouting({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./build/templates'))
  ;
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server:start', function() {
  $.connect.server({
    root: './build',
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    },
  });
});

// Builds your entire app once, without starting a server
gulp.task('build', function() {
  runSequence('clean', 'jshint', ['copy', 'sass', 'uglify'], 'copy-templates', function() {
    console.log("Successfully built.");
  })
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build', 'server:start'], function() {
  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/**/*.js'], ['jshint', 'uglify']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/**/*.js', '!./client/**/*.scss'], ['copy']);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html', './client/bottletrade/**/*.html'], ['copy-templates']);
});
