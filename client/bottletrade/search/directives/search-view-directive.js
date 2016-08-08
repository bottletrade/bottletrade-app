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

          BeerManager.searchByNameBegins(val, function(id, beer) {
            addResult('beer', id, beer);
          }, function(id, beer) {
            removeResult('beer', id, beer);
          });

          BreweryManager.searchByNameBegins(val, function(id, brewery) {
            addResult('brewery', id, brewery);
          }, function(id, brewery) {
            removeResult('brewery', id, brewery);
          });

          SpiritManager.searchByNameBegins(val, function(id, spirit) {
            addResult('spirit', id, spirit);
          }, function(id, spirit) {
            removeResult('spirit', id, spirit);
          });

          DistilleryManager.searchByNameBegins(val, function(id, distillery) {
            addResult('distillery', id, distillery);
          }, function(id, distillery) {
            removeResult('distillery', id, distillery);
          });

          WineManager.searchByNameBegins(val, function(id, wine) {
            addResult('wine', id, wine);
          }, function(id, wine) {
            removeResult('wine', id, wine);
          });

          WineryManager.searchByNameBegins(val, function(id, winery) {
            addResult('winery', id, winery);
          }, function(id, winery) {
            removeResult('winery', id, winery);
          });

          function addResult(type, id, obj) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            obj.$id = id;
            $timeout(function() {
              var resultObj = {};
              resultObj.type = type;
              resultObj[type] = obj;
              scope.results.push(resultObj);
            });
          }

          function removeResult(type, id, obj) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              lodash.remove(scope.results, function(result) {
                if (result.type == type && result[type].$id == id) {
                  return true;
                }
                return false;
              });
            });
          }
        };

        scope.$watch('query', function(newVal, oldVal) {
          if (newVal) {
            scope.performSearch(newVal);
          } else {
            // clear results
            lastQueryVal = "";
            lastQueryTime = new Date();
            scope.results.splice(0, scope.results.length);
          }
        });
      }
    };
  });
})();
