(function() {
  'use strict';

  angular.module('application').controller("BreweriesCtrl",
    function($scope, $state, $stateParams, Brewery, BreweryList) {
      if ($stateParams.id) {
        $scope.brewery = new Brewery($stateParams.id);
      } else {
        $scope.breweries = BreweryList;
      }

      $scope.createdBrewery = function(brewery) {
        $state.go('app.breweries', { id: brewery.key() });
      };
  });
})();
