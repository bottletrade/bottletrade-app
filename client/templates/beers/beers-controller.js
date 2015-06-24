(function() {
  'use strict';

  angular.module('application').controller("BeersCtrl",
    function($scope, $state, $stateParams, $timeout, Beer, BeerList, BeerManager, FoundationApi) {
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
        var beerData = $scope.beers.$getRecord(beer.key());
        $state.go('app.beers', { id: beer.key() });

        $timeout(function() {
          FoundationApi.publish('app-notifications', {
            title: "Beer Added!",
            content: beerData.name + " has been added to the BottleTrade network",
            color: "success",
            autoclose: '5000'
          });
        });
      };

      $scope.updated = function(beer) {
        var beerData = $scope.beer;
        $state.go('app.beers', { id: beer.key() });

        $timeout(function() {
          FoundationApi.publish('app-notifications', {
            title: "Beer Updated!",
            content: beerData.name + " has been updated in the BottleTrade network",
            color: "success",
            autoclose: '5000'
          });
        });
      };

      $scope.addedToCellar = function(bottle) {
        bottle.once('value', function(snapshot) {
          var beerData = $scope.beer;
          $state.go('app.cellar', {}, { reload: true });

          $timeout(function() {
            FoundationApi.publish('app-notifications', {
              title: "Bottle Added!",
              content: beerData.name + " has been added to your cellar",
              color: "success",
              autoclose: '5000'
            });
          });
        });
      };
  });
})();
