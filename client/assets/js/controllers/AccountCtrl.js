(function() {
  'use strict';

  angular.module('application').controller("AccountCtrl", ["$scope", "$state", "firebaseRef", "user", function($scope, $state, firebaseRef, user) {
    $scope.user = user;

    $scope.providers = [
      { id: 'twitter',  name: 'Twitter' },
      { id: 'facebook', name: 'Facebook' },
      { id: 'google', name: 'Google' },
      { id: 'email', name: 'BottleTrade' }
    ];
    $scope.email = "";
    $scope.password = "";

    $scope.selectProvider = function(provider) {
      $scope.provider = provider;

      if (provider.name != "BottleTrade") {
        firebaseRef().authWithOAuthPopup(provider.id, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $state.go("profile");
          }
        });
      }
    };

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }]);

})();
