(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').factory("AutoCompleteManager",
    function($timeout, firebaseRef, BTConstants, BeerManager, BreweryManager, SpiritManager, DistilleryManager, WineManager, WineryManager) {
      return {
        prepareBeerAutoComplete: prepareBeerAutoComplete,
        prepareBreweryAutoComplete: prepareBreweryAutoComplete
      };

      function prepareBeerAutoComplete(scope) {
        return prepareAutoComplete('beer', scope);
      }

      function prepareBreweryAutoComplete(scope) {
        return prepareAutoComplete('brewery', scope);
      }

      function prepareAutoComplete(type, scope) {
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

          switch (type) {
            case 'beer':
              BeerManager.searchByNameBegins(val, addResult, removeResult);
              break;
            case 'brewery':
              BreweryManager.searchByNameBegins(val, addResult, removeResult);
              break;
            case 'wine':
              WineManager.searchByNameBegins(val, addResult, removeResult);
              break;
            case 'winery':
              WineryManager.searchByNameBegins(val, addResult, removeResult);
              break;
            case 'spirit':
              SpiritManager.searchByNameBegins(val, addResult, removeResult);
              break;
            case 'distillery':
              DistilleryManager.searchByNameBegins(val, addResult, removeResult);
              break;
          }

          function addResult(id, obj) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            obj.$id = id;
            $timeout(function() {
              scope.results.push(obj);
            });
          }

          function removeResult(id, obj) {
            // ignore if not for current query
            if (lastQueryTime !== currentQueryTime) {
              return;
            }

            $timeout(function() {
              lodash.remove(scope.results, function(result) {
                if (result.$id == id) {
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
    }
  );
})();
