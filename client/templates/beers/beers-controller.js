(function() {
  'use strict';

  angular.module('application').controller("BeersCtrl",
    function($scope, $state, $stateParams, Beer, BeerList, BeerManager) {
      if ($stateParams.id) {
        $scope.beer = new Beer($stateParams.id);
      } else {
        $scope.beers = BeerList;
      }

      if ($stateParams.type) {
        switch ($stateParams.type) {
          case "cellar":

        }
      }

      $scope.created = function(beer) {
        $state.go('app.beers', { id: beer.key() });
      };

      $scope.updated = function(brewery) {
        $state.go('app.beers', { id: beer.key() });
      };
  });
})();
