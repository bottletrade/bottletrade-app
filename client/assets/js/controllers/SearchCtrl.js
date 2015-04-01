(function() {
  'use strict';

  angular.module('application').controller("SearchCtrl", function($scope, UntappdBeerSearch, UntappdBrewerySearch) {
    $scope.search = "";
    $scope.type = "";
    $scope.beers = [];
    $scope.breweries = [];

    $scope.$watch('search', function(newVal, oldVal) {
      if (newVal) {
        if ($scope.type === "Beer") {
          $scope.beers = UntappdBeerSearch.query({search: newVal});
        } else if ($scope.type === "Brewery") {
          $scope.breweries = UntappdBrewerySearch.query({search: newVal});
        }
      }
    });

    $scope.$watch('type', function(newVal, oldVal) {
      if ($scope.search) {
        if ($scope.type === "Beer") {
          $scope.beers = UntappdBeerSearch.query({search: $scope.search});
        } else if ($scope.type === "Brewery") {
          $scope.breweries = UntappdBrewerySearch.query({search: $scope.search});
        }
      }
    });
  });

})();
