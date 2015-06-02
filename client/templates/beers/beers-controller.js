(function() {
  'use strict';

  angular.module('application').controller("BeersCtrl",
    function($scope, $state, $stateParams, Beer, BeerList, BeerManager) {
      if ($stateParams.id && $stateParams.id !== "new") {
        $scope.beer = new Beer($stateParams.id);
      } else {
        $scope.beers = BeerList;
        if ($stateParams.id === "new") {
          $scope.action = "new";
        }
      }

      if ($stateParams.action) {
        switch ($stateParams.action) {
          case "cellar":
            $scope.action = "cellar";
            break;
          case "edit":
            $scope.action = "edit";
            break;
        }
      }

      $scope.created = function(beer) {
        $state.go('app.beers', { id: beer.key() });
      };

      $scope.updated = function(beer) {
        $state.go('app.beers', { id: beer.key() });
      };

      $scope.addedToCellar = function(bottle) {
        bottle.once('value', function(snapshot) {
          var data = snapshot.val();
          $state.go('app.beers', { id: data.beverage, action: '' }, { reload: true });
        });
      };
  });
})();
