(function() {
  'use strict';

  angular.module('application').controller("BeersCtrl",
    function($scope, $state, $stateParams, Beer, BeerList) {
      if ($stateParams.id) {
        $scope.beer = new Beer($stateParams.id);
      } else {
        $scope.beers = BeerList;
      }

      $scope.created = function(beer) {
        $state.go('app.beers', { id: beer.key() });
      };

      $scope.updated = function(brewery) {
        $state.go('app.beers', { id: beer.key() });
      };
  });
})();
