(function() {
  'use strict';

  angular.module('application').directive('searchView', function(firebaseRef) {
    return {
      replace: true,
      templateUrl: 'partials/search-view.html',
      scope: {
        query: '='
      },
      link: function(scope, element) {
        scope.results = [];
        scope.loading = false;
        /*
        scope.searchLocal = function(val) {
          firebaseRef().child('user').orderByChild('name').startAt(val).endAt(val + "~").on('child_added',  function(snapshot) {
            var key = snapshot.key();
          });
        };

        scope.searchUntappd = function(val) {
          UntappdSearch.query({query: val}).$promise.then(function(results) {
            var newBeerIds, newBreweryIds, oldBeerIds, oldBreweryIds;

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
          });
        };
*/
        scope.$watch('query', function(newVal, oldVal) {
          if (newVal) {
            scope.searchLocal(newVal);
          }
        });
      }
    };
  });
})();
