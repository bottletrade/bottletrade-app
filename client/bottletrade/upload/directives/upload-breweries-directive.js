(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadBreweries',
  function($timeout, BreweryList, BreweryManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-breweries.html',
      scope: {
        fileData: '=',
        breweries: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseBreweryResult(result);
        });

        scope.save = function() {
          scope.breweries.forEach(function(result) {
            addParsedBeerResult(result);
          });
        };

        function addParsedBreweryResult(result) {
          var brewery;

          // check if we need to add the brewery
          if (!result.matchedBreweries) {
            brewery = {
              name: result.name.toString()
            };

            BreweryList.$add(brewery).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function parseBreweryResult(result) {
          if (result.name) {
            // check if brewery name exists
            $timeout(function() {
              BreweryManager.searchByNameExact(result.name, function(key, brewery) {
                // only create object once a result is returned
                if (!result.matchedBreweries) {
                  result.matchedBreweries = {};
                }
                result.matchedBreweries[key] = brewery;
              });
            });
          }

          scope.breweries.push(result);
        }
      }
    };
  });
})();
