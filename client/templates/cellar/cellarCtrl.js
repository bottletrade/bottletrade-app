(function() {
  'use strict';

  angular.module('application').controller("CellarCtrl", function($scope, user, BottleList) {
    $scope.bottles = new BottleList();
  });
})();
