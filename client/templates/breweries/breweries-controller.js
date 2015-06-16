(function() {
  'use strict';

  angular.module('application').controller("BreweriesCtrl",
    function($scope, $state, $stateParams, $timeout, FoundationApi, Brewery, BreweryList) {
      if ($stateParams.id) {
        $scope.brewery = new Brewery($stateParams.id);
      } else {
        $scope.breweries = BreweryList;
      }

      $scope.created = function(brewery) {
        var breweryData = $scope.breweries.$getRecord(brewery.key());
        $state.go('app.breweries', { id: brewery.key() });

        $timeout(function() {
          FoundationApi.publish('app-notifications', {
            title: "Brewery Added!",
            content: breweryData.name + " has been added to the BottleTrade network",
            color: "success",
            autoclose: '5000'
          });
        });
      };

      $scope.updated = function(brewery) {
        var breweryData = $scope.brewery;
        $state.go('app.breweries', { id: brewery.key() });

        $timeout(function() {
          FoundationApi.publish('app-notifications', {
            title: "Brewery Updated!",
            content: breweryData.name + " has been updated in the BottleTrade network",
            color: "success",
            autoclose: '5000'
          });
        });
      };
  });
})();
