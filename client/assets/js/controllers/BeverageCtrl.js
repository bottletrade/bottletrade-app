(function() {
  'use strict';

  angular.module('application').controller("BeverageCtrl",
    function($scope, $state, $stateParams, lodash, BTConstants, BTService) {
      if ($state.includes("app.beer")) {
        $scope.bevType = BTConstants.beverages.beer;
      } else if ($state.includes("app.wine")) {
        $scope.bevType = BTConstants.beverages.wine;
      } else if ($state.includes("app.spirit")) {
        $scope.bevType = BTConstants.beverages.spirit;
      }

      $scope.createdBeverage = function(beverage) {
        $state.go('app.beer', { id: beverage.id });
      };

      $scope.beer = lodash.find(BTService.getBeers(), function(beer) {
        return beer.id == $stateParams.id;
      });
  });
})();
