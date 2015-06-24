(function() {
  'use strict';

  angular.module('application').controller("ProfileCtrl", function($scope, user, BottleList, BottleManager) {
    $scope.bottles = new BottleList();
    $scope.bottleMgr = BottleManager;
  });
})();
