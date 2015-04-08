(function() {
  'use strict';

  angular.module('application').controller("SearchCtrl", function($scope, lodash, user, UntappdSearch) {
    $scope.query = "";
    $scope.results = [];
    $scope.loading = false;

    $scope.$watch('query', function(newVal, oldVal) {
      if (newVal) {
        UntappdSearch.query({query: newVal}).$promise.then(function(results) {
          var newBeerIds, newBreweryIds, oldBeerIds, oldBreweryIds;

          // make sure search results are for the latest query
          if ($scope.query === newVal) {
            newBeerIds = lodash.map(results.beers, function(result) {
              return result.beer.bid;
            });
            newBreweryIds = lodash.map(results.breweries, function(result) {
              return result.brewery.brewery_id;
            });

            // remove results not still in list
            lodash.remove($scope.results, function(result) {
              if (result.type == 'beer') {
                return !lodash.includes(newBeerIds, result.id);
              } else if (result.type == 'brewery') {
                return !lodash.includes(newBreweryIds, result.id);
              }
            });

            oldBeerIds =  lodash.chain($scope.results)
              .where(function(result) {
                 return result.type == 'beer';
              })
              .pluck('id');

            oldBreweryIds = lodash.chain($scope.results)
              .where(function(result) {
                return result.type == 'beer';
              })
              .pluck('id');

            // add new beers to list
            results.beers.forEach(function(data) {
              if (!lodash.includes(oldBeerIds, data.beer.bid)) {
                $scope.results.push({
                  type: 'beer',
                  id: data.beer.bid,
                  name: data.beer.beer_name,
                  data: data
                });
              }
            });

            // add new breweries to list
            results.breweries.forEach(function(data) {
              if (!lodash.includes(oldBreweryIds, data.brewery.brewery_id)) {
                $scope.results.push({
                  type: 'brewery',
                  id: data.brewery.brewery_id,
                  name: data.brewery.brewery_name,
                  data: data
                });
              }
            });
          }
        });
      }
    });
  });

})();
