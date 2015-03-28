(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    
    // firebase
    'firebase',
    'firebase.routeSecurity',
    'firebase.utils',

    // foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',
    
    // hotfix for svg loading issues
    'ngSVGAttributes'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

  function config($urlProvider, $locationProvider, $stateProvider) {
    $urlProvider.otherwise('/');

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
      url: "/account",
      abstract: true,
      template: '<div class="grid-block" ng-class="[\'ui-animation\']" ui-view/>',
      authRequired: false
    })
    .state("app.account", {
      url: "/account",
      abstract: true,
      controller: "AccountCtrl",
      template: '<div class="grid-block" ng-class="[\'ui-animation\']" ui-view/>',
      authRequired: false
    })
    .state("app.account.login", {
      url: "/login",
      templateUrl: "/templates/account/account.login.html"
    })
    .state("app.account.setup", {
      url: "/setup",
      templateUrl: "/templates/account/account.setup.html"
    });
  }
  
  run.$inject = ['$rootScope'];

  function run($rootScope, $state) {
    FastClick.attach(document.body);
    
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("home");
      }
    });
  }

})();
