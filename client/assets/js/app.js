(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngLodash',
    'angucomplete-alt',

    // firebase
    'bottletrade.firebase',

    // base apps
    'base',

    // icons
    'angularIcons.iconic',

    // dynamic routing
    'dynamicRouting',
    'dynamicRouting.animations',

    // bottletrade
    'bottletrade'
  ]);

  angular.module('application').config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    $stateProvider.state("app", {
      controller: "IndexCtrl",
      templateUrl: "templates/app.html",
      authRequired: false,
      abstract: true,
      resolve: {
        "user": ["$firebaseAuth", "$rootScope", function($firebaseAuth, $rootScope) {
          return $firebaseAuth().$waitForSignIn().then(function(user) {
            if (!user) {
              return $firebaseAuth().$signInAnonymously();
            } else {
              $rootScope.user = user;
            }
          });
        }]
      }
    });

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBkom-6-JYJuUH0t77V-yWxXdboZ3daKoo",
      authDomain: "bottletrade-8613d.firebaseapp.com",
      databaseURL: "https://bottletrade-8613d.firebaseio.com",
      storageBucket: "",
    };
    firebase.initializeApp(config);
  });

  angular.module('application').run(function($firebaseAuth, $rootScope, $state, SearchService) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go("app.home");
      }
    });

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      if (toState !== "app.search") {
        SearchService.setQuery("");
      }
    });

    // handle updates to authentication
    $firebaseAuth().$onAuthStateChanged(function(user) {
      if (!user) {
        // sign in anonymously
        $firebaseAuth().$signInAnonymously().then(function() {
          $rootScope.user = user;
        }, function() {
          $rootScope.user = null;
        });
      } else {
        $rootScope.user = user;
      }
    });
  });

})();
