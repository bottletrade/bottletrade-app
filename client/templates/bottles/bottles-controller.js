(function() {
  'use strict';

  angular.module('application').controller("BottlesCtrl",
    function($scope, $state, $stateParams, $rootScope, Bottle, BottleList) {
      if ($stateParams.id) {
        $scope.bottle = new Bottle($stateParams.id);
      } else {
        $scope.bottles = new BottleList();
      }

      $scope.created = function(bottle) {
        $state.go('app.bottles', { id: bottle.key() });
      };
  });
})();
