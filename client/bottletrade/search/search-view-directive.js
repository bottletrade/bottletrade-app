(function() {
  'use strict';

  angular.module('bottletrade').directive('searchView', function(
    $state,
    $timeout,
    BeerSearch,
    BrewerySearch,
    SpiritSearch,
    DistillerySearch,
    WineSearch,
    WinerySearch) {
    return {
      replace: true,
      templateUrl: '/bottletrade/search/search-view.html',
      scope: {
        query: '='
      },
      link: function(scope, element) {
        var lastQueryTime = null, lastQueryVal = "";

        scope.results = [];
        scope.loading = false;

        scope.performSearch = function(val) {
          var currentQueryTime;

          // don't run search if same query
          if (val === lastQueryVal) {
            return;
          }

          currentQueryTime = new Date();
          lastQueryTime = currentQueryTime;
          lastQueryVal = val;
          scope.results.splice(0, scope.results.length);

          BeerSearch.searchByName(val, function(id, beer) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'beer',
                beer: beer
              });
            });
          });

          BrewerySearch.searchByName(val, function(id, brewery) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'brewery',
                brewery: brewery
              });
            });
          });

          SpiritSearch.searchByName(val, function(id, spirit) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'spirit',
                spirit: spirit
              });
            });
          });

          DistillerySearch.searchByName(val, function(id, distillery) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'distillery',
                distillery: distillery
              });
            });
          });

          WineSearch.searchByName(val, function(id, wine) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'wine',
                wine: wine
              });
            });
          });

          WinerySearch.searchByName(val, function(id, winery) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              scope.results.push({
                type: 'winery',
                winery: winery
              });
            });
          });
          /*

          firebaseRef().
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
          });*/
        };

        scope.$watch('query', function(newVal, oldVal) {
          if (newVal) {
            scope.performSearch(newVal);
          } else {
            // clear results
            scope.results.splice(0, scope.results.length);
          }
        });
      }
    };
  });
})();
