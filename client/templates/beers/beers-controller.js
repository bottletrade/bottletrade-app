(function() {
  'use strict';

  angular.module('application').controller("BeersCtrl",
    function($scope, $state, $stateParams, Beer, BeerList) {
      if ($stateParams.id) {
        $scope.beer = new Beer($stateParams.id);
      } else {
        $scope.beers = BeerList;
      }

      $scope.createdBeer = function(beer) {
        $state.go('app.beers', { id: beer.key() });
      };
  });
})();
