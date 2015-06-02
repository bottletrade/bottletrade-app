(function() {
  'use strict';

  angular.module('application').controller("ProfileCtrl", function($scope, user, BottleList) {
    $scope.bottles = BottleList;
  });
})();
