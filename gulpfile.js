'use strict';

// BaseApps for Apps
//
// We use this Gulpfile to assemble the documentation, run unit tests,
// and deploy changes to the live documentation and CDN.
//
// The tasks are grouped into these categories:
//   1. Libraries
//   2. Variables
//   3. Cleaning files
//   4. Copying files
//   5. Stylesheets
//   6. JavaScript
//   7. Testing
//   8. Server
//   9. Deployment
//  10. Default tasks

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    rimraf      = require('rimraf'),
    runSequence = require('run-sequence'),
    semver      = require('semver'),
    modRewrite  = require('connect-modrewrite'),
    routes      = require('angular-front-router'),
    merge       = require('merge-stream'),
    octophant   = require('octophant'),
    Server      = require('karma').Server;

// 2. VARIABLES
// - - - - - - - - - - - - - - -
var production = false;
var version = "";

var paths = {
  html: {
    base: [
      './client/index.html'
    ],
    templates: [
      './client/**/*.html',
      '!./client/index.html'
    ]
  },
  sass: {
    loadPaths: [
      'scss',
      'client/assets/scss',
      'bower_components/angular-base-apps/scss'
    ],
    testPaths: [
      'scss',
      'client/assets/scss',
      'bower_components/bootcamp/dist'
    ]
  },
  javascript: {
    libs: [
      'bower_components/fastclick/lib/fastclick.js',
      'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
      'bower_components/tether/tether.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/hammerjs/hammer.js',
      'bower_components/ng-lodash/build/ng-lodash.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angucomplete-alt/dist/angucomplete-alt.min.js',
      'node_modules/angular-icons/lib/iconic.min.js',
      'node_modules/angular-icons/iconic.js',
      'node_modules/angular-dynamic-routing/dynamicRouting.js',
      'node_modules/angular-dynamic-routing/dynamicRouting.animations.js'
    ],
    app: [
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'client/bottletrade/bottletrade.js',
      'client/bottletrade/**/*.js',
      'client/assets/js/app.js',
      'client/**/*.js'
    ]
  }
};

// 3. CLEANIN' FILES
// - - - - - - - - - - - - - - -

// Clean build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Clean the dist directory
gulp.task('clean:dist', function(cb) {
  rimraf('./dist', cb);
});

// Clean the routes file
gulp.task('clean:templates', function(cb) {
  rimraf('./build/assets/js/routes.js', cb);
});

// 4. COPYING FILES
// - - - - - - - - - - - - - - -

// Copy static files (but not the Angular templates, Sass, or JS)
gulp.task('copy', function() {
  var merged = merge();

  merged.add(gulp.src(paths.html.base, {
    base: './client/'
  })
    .pipe(gulp.dest('build')));

  merged.add(gulp.src('./client/assets/fonts/**/*')
    .pipe(gulp.dest('build/assets/fonts/')));

  merged.add(gulp.src('./client/assets/img/**/*')
    .pipe(gulp.dest('build/assets/img/')));

  merged.add(gulp.src('./node_modules/angular-icons/icons/iconic/**/*')
    .pipe(gulp.dest('build/assets/img/iconic/')));

  return merged;
});

// Copy page templates and generate routes
gulp.task('copy:templates', ['clean:templates', 'javascript'], function() {
  return gulp.src(paths.html.templates, {
    base: './client/'
  })
    .pipe(routes({
      path: 'build/assets/js/routes.js',
      root: 'client',
      placeholder: '<routes>',
      template: "angular.module('dynamicRouting').config(['$FoundationStateProvider', function(FoundationStateProvider){ FoundationStateProvider.registerDynamicRoutes(<routes>); }]);"
    }))
    .pipe(gulp.dest('./build'))
  ;
});

// 5. STYLESHEETS
// - - - - - - - - - - - - - - -

// Inject styles for docs-specific libraries
gulp.task('css', ['sass'], function() {
  var dirs = [
    'bower_components/angucomplete-alt/angucomplete-alt.css',
    'build/assets/css/app.css'
  ];
  return gulp.src(dirs)
    .pipe($.concat('app.css'))
    .pipe(gulp.dest('build/assets/css'))
  ;
});

// Compile stylesheets
gulp.task('sass', function() {
  var merged = merge();

  merged.add(gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass.loadPaths,
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'ie >= 10', 'iOS >= 7', 'Safari >= 7', 'Opera >= 25']
    }))
    .pipe($.if(production, $.minifyCss()))
    .pipe(gulp.dest('./build/assets/css/')));

  return merged;
});

// 6. JAVASCRIPT
// - - - - - - - - - - - - - - -

// Compile BaseApps JavaScript
gulp.task('javascript', function() {
  var merged = merge();

  merged.add(gulp.src(paths.javascript.libs)
    .pipe($.if(production, $.uglify()))
    .pipe($.concat('base-apps-dep.js'))
    .pipe(gulp.dest('./build/assets/js/')));

  merged.add(gulp.src(paths.javascript.app)
    .pipe($.ngAnnotate())
    .pipe($.if(production, $.uglify()))
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/')));

  return merged;
});

// 7. SERVER
// - - - - - - - - - - - - - - -

gulp.task('server:start', function() {
  $.connect.server({
    port: 8081,
    root: './build',
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    }
  });
});

gulp.task('server:start:dist', function() {
  $.connect.server({
    port: 8081,
    root: './dist',
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    }
  });
});

// 9. DISTRIBUTION BUILD
// - - - - - - - - - - - - - - -

gulp.task('copy:dist', function() {
  var merged = merge();

  // copy app
  merged.add(gulp.src([
    "./build/**/*.html",
    "./build/assets/fonts/**/*",
    "./build/assets/img/**/*",
    "./build/assets/css/app.css",
    "./build/assets/js/app.js",
    "./build/assets/js/base-apps-dep.js",
    "./build/assets/js/routes.js",
    "./build/assets/js/templates.js"
  ], {
    base: "./build"
  })
    .pipe(gulp.dest('./dist')));

  return merged;
});

// 10. NOW BRING IT TOGETHER
// - - - - - - - - - - - - - - -

gulp.task('production:enable', function(cb) { production = true; cb(); });

// Build the documentation once
gulp.task('build', function(cb) {
  runSequence('clean', ['copy', 'css', 'javascript', 'copy:templates'], function() {
    cb();
  });
});

gulp.task('build:dist', function(cb) {
  runSequence('clean:dist', 'production:enable', 'build', 'copy:dist', function() {
    cb();
  });
});

// Build the documentation, start a test server, and re-compile when files change
gulp.task('default', ['initversion:patch', 'build', 'server:start'], function() {

  // Watch static files
  gulp.watch(paths.html.base, ['copy']);

  // Watch Angular templates
  gulp.watch(paths.html.templates, ['copy:templates']);

  // Watch Angular partials
  gulp.watch(paths.html.partials, ['copy:partials']);

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['css']);

  // Watch JavaScript
  gulp.watch(paths.javascript.app, ['javascript']);
});

// Build the documentation, start a test server, and re-compile when files change
gulp.task('default:dist', ['initversion:patch', 'build:dist', 'server:start:dist'], function() {

  // Watch static files
  gulp.watch(paths.html.base, ['copy', 'copy:dist']);

  // Watch Angular templates
  gulp.watch(paths.html.templates, ['copy:templates', 'copy:dist']);

  // Watch Angular partials
  gulp.watch(paths.html.partials, ['copy:partials', 'copy:dist']);

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['css', 'copy:dist']);

  // Watch JavaScript
  gulp.watch(paths.javascript.app, ['javascript', 'copy:dist']);
});

gulp.task('initversion:prerelease', function() { return initVersion('prerelease'); });
gulp.task('initversion:patch', function() { return initVersion('patch'); });
gulp.task('initversion:minor', function() { return initVersion('minor'); });
gulp.task('initversion:major', function() { return initVersion('major'); });

gulp.task('bump:prerelease', ['initversion:prerelease'], function() { return bump(); });
gulp.task('bump:patch', ['initversion:patch'], function() { return bump(); });
gulp.task('bump:minor', ['initversion:minor'], function() { return bump(); });
gulp.task('bump:major', ['initversion:major'], function() { return bump(); });

gulp.task('publish:prerelease', function(cb) {runSequence('build:dist', 'bump:prerelease', 'build:publish', cb); });
gulp.task('publish:patch', function(cb) { runSequence('build:dist', 'bump:patch', 'build:publish', cb); });
gulp.task('publish:minor', function(cb) { runSequence('build:dist', 'bump:minor', 'build:publish', cb); });
gulp.task('publish:major', function(cb) { runSequence('build:dist', 'bump:major', 'build:publish', cb); });

gulp.task('publish:ghpages', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('build:publish', function() {
  return gulp.src(['./package.json', './bower.json', './dist'])
    // commit the changes
    .pipe($.git.add())
    .pipe($.git.commit('bump version'))
    // read only one file to get the version number
    .pipe($.filter('package.json'))
    // **tag it in the repository**
    .pipe($.tagVersion());
});

function bump() {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe($.bump({version: version}))
    // save it back to filesystem
    .pipe(gulp.dest('./'));
}

function initVersion(importance) {
  return gulp.src('./package.json')
    .pipe($.tap(function(file) {
      var json = JSON.parse(String(file.contents));
      version = semver.inc(json.version, importance);
    }));
}
