(function() {
  'use strict';

  angular.module('bottletrade.search').directive('searchView', function(
    $state,
    $timeout,
    lodash,
    BeerManager,
    BreweryManager,
    SpiritManager,
    DistilleryManager,
    WineManager,
    WineryManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/search/directives/search-view.html',
      scope: {
        query: '='
      },
      link: function(scope, element) {
        var lastQueryVal = "";

        scope.results = [];
        scope.loading = false;

        scope.performSearch = function(val) {
          // don't run search if same query
          if (val === lastQueryVal) {
            return;
          }

          lastQueryVal = val;
          scope.results.splice(0, scope.results.length);

          BeerManager.searchByNameBegins(val).then(function(beers) {
            beers.forEach(function(beer) {
              addResult('beer', beer);
            });
          });

          BreweryManager.searchByNameBegins(val).then(function(breweries) {
            breweries.forEach(function(brewery) {
              addResult('brewery', brewery);
            });
          });

          SpiritManager.searchByNameBegins(val).then(function(spirits) {
            spirits.forEach(function(spirit) {
              addResult('spirit', spirit);
            });
          });

          DistilleryManager.searchByNameBegins(val).then(function(distilleries) {
            distilleries.forEach(function(distillery) {
              addResult('distillery', distillery);
            });
          });

          WineManager.searchByNameBegins(val).then(function(wines) {
            wines.forEach(function(wine) {
              addResult('wine', wine);
            });
          });

          WineryManager.searchByNameBegins(val).then(function(wineries) {
            wineries.forEach(function(winery) {
              addResult('winery', winery);
            });
          });

          function addResult(type, obj) {
            $timeout(function() {
              var resultObj = {};
              resultObj.type = type;
              resultObj[type] = obj;
              scope.results.push(resultObj);
            });
          }
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
