(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngLodash',

    // firebase
    'bottletrade.firebase',

    // base apps
    'base',
    'base.dynamicRouting',
    'base.dynamicRouting.animations',

    // bottletrade
    'bottletrade',

    // hotfix for svg loading issues
    'ngSVGAttributes'
  ]);

  angular.module('application').config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    $stateProvider
    .state("app", {
      controller: "IndexCtrl",
      templateUrl: "templates/app.html",
      authRequired: false,
      abstract: true,
      resolve: {
        "user": ["Auth", "$rootScope", function(Auth, $rootScope) {
          var user = Auth.$waitForAuth();
          user.then(function(user) {
            $rootScope.user = user;
          });
          return user;
        }]
      }
    });
  });

  angular.module('application').run(function($rootScope, $state, Auth, SearchService) {
    FastClick.attach(document.body);

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
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
    Auth.$onAuth(function(user) {
      $rootScope.user = user;

      if (!user) {
        // redirect user to home if logging out
        $state.go("app.home");
      }
    });
  });

})();
