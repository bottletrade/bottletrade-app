(function() {
  'use strict';

  angular.module('application').controller("CellarCtrl", function($scope, user, BottleList, BottleManager) {
    $scope.bottles = new BottleList();
    $scope.bottleMgr = BottleManager;
  });
})();
