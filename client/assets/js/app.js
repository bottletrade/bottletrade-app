(function() {
  'use strict';

  angular.module('bottletrade', []);

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngLodash',

    // firebase
    'firebase',
    'firebase.routeSecurity',
    'firebase.utils',

    // foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // bottletrade
    'bottletrade',

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
