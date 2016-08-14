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

      if ($stateParams.action) {
        switch ($stateParams.action) {
          case "edit":
            $scope.action = "edit";
            break;
        }
      }

      $scope.updated = function(bottle) {
        $state.go('app.bottles', { id: bottle.$id, action: '' });

        FoundationApi.publish('app-notifications', {
          title: "Bottle Updated!",
          content: bottle.beverage.name + " has been updated in your cellar",
          color: "success",
          autoclose: '5000'
        });
      };
  });
})();