(function() {
  'use strict';

  angular.module('application').controller("HomeCtrl", function($scope, user) {
    $scope.user = user;
    $scope.providers = [
      { id: 'twitter',  name: 'Twitter' },
      { id: 'facebook', name: 'Facebook' },
      { id: 'google', name: 'Google' },
      { id: 'email', name: 'BottleTrade' }
    ];
  });

})();
