(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngResource',

    // firebase
    'firebase',
    'firebase.routeSecurity',
    'firebase.utils',

    // foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // untappd
    'untappd',

    // hotfix for svg loading issues
    'ngSVGAttributes'
  ]);

  angular.module('application').config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      requireBase: false
    });

    $stateProvider
    .state("app", {
      controller: "IndexCtrl",
      templateUrl: "templates/app.html",
      authRequired: false,
      abstract: true,
      resolve: {
        "user": ["Auth", function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    })
    .state("app.home", {
      url: "/",
      controller: "HomeCtrl",
      templateUrl: "/templates/home.html",
      authRequired: false
    })
    .state("app.profile", {
      url: "/profile",
      controller: "ProfileCtrl",
      templateUrl: "/templates/profile.html",
      authRequired: true
    })
    .state("app.educate", {
      url: "/educate",
      abstract: true,
      template: '<div class="grid-block" ui-view/>',
      authRequired: false
    })
    .state("app.store", {
      url: "/store",
      abstract: false,
      templateUrl: "/templates/store.html",
      authRequired: false
    })
    .state("app.blog", {
      url: "/blog",
      abstract: false,
      templateUrl: "/templates/blog.html",
      authRequired: false
    })
    .state("app.account", {
      url: "/account",
      abstract: true,
      controller: "AccountCtrl",
      template: '<div class="grid-block" ui-view/>',
      authRequired: false
    })
    .state("app.account.login", {
      url: "/login",
      templateUrl: "/templates/account/account.login.html"
    })
    .state("app.account.setup", {
      url: "/setup",
      templateUrl: "/templates/account/account.setup.html"
    })
    .state("app.account.settings", {
      url: "/settings",
      templateUrl: "/templates/account/account.settings.html",
      authRequired: false
    });
  });

  angular.module('application').run(function($rootScope, $state) {
    FastClick.attach(document.body);

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("home");
      }
    });
  });

})();
