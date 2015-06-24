(function() {
  'use strict';

  angular.module('application').controller("BottlesCtrl",
    function($scope, $state, $stateParams, $rootScope, $timeout, FoundationApi, Bottle, BottleList, BottleManager) {
      if ($stateParams.id) {
        $scope.bottle = new Bottle($stateParams.id);
      } else {
        $scope.bottles = new BottleList();
      }
      $scope.bottleMgr = BottleManager;

      $scope.created = function(bottle) {
        $state.go('app.bottles', { id: bottle.key() });
      };
  });
})();
