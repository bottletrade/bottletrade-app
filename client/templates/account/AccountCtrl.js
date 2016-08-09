(function() {
  'use strict';

  angular.module('application').controller("AccountCtrl", function($scope, $state, $firebaseAuth, $timeout, $rootScope, user, FoundationApi) {
    if ($state.is("app.account.login") && $rootScope.user && !$rootScope.user.isAnonymous) {
      $state.go("app.profile");
      return;
    }

    $scope.providers = [
      { id: 'twitter',  name: 'Twitter' },
      { id: 'facebook', name: 'Facebook' },
      { id: 'google', name: 'Google' },
      { id: 'email', name: 'BottleTrade' }
    ];
    $scope.loginData = {
      email: "",
      password: ""
    };
    $scope.setupData = {
      email: "",
      password: ""
    };

    $scope.selectProvider = function(provider) {
      $scope.selectedProvider = provider;

      if (provider.name != "BottleTrade") {
        $firebaseAuth().$signInWithPopup(provider.id).then(function(authData) {
          console.log("Authenticated successfully with payload:", authData);
          $firebaseAuth().$waitForSignIn().then(function(user) {
            $state.go("app.profile");
          });
        }, function(error) {
          console.log("Login Failed!", error);
        });
      }
    };

    $scope.createUser = function() {
      $firebaseAuth().$createUserWithEmailAndPassword($scope.setupData.email, $scope.setupData.password)
        .then(function(userData) {
          FoundationApi.publish('app-notifications', {
            content: "User created",
            color: "success",
            autoclose: '5000'
          });

          $scope.loginData.email = $scope.setupData.email;
          $scope.loginData.password = $scope.setupData.password;
          $scope.setupData.email = "";
          $scope.setupData.password = "";
          $scope.loginUser();
        }).catch(function(error) {
          FoundationApi.publish('app-notifications', {
            content: error.message,
            color: "alert",
            autoclose: '5000'
          });
        });
    };

    $scope.loginUser = function() {
      $firebaseAuth().$signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
        .then(function(userData) {
          $scope.loginData.email = "";
          $scope.loginData.password = "";
          $timeout(function() {
            $state.go("app.profile");
          }, 500);
        }).catch(function(error) {
          FoundationApi.publish('app-notifications', {
            content: error.message,
            color: "alert",
            autoclose: '5000'
          });
        });
    };
  });

})();
