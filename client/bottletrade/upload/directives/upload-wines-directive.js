(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadWines',
  function($timeout, WineryList, WineList, WineryManager, WineManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-wines.html',
      scope: {
        fileData: '=',
        wines: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseWineResult(result);
        });

        scope.save = function() {
          scope.wines.forEach(function(result) {
            addParsedWineResult(result);
          });
        };

        function addParsedWineResult(result) {
          var wine, winery;

          // check if we need to add the winery
          if (!result.matchedWineries) {
            winery = {
              name: result.winery.toString()
            };

            WineryList.$add(winery).then(function(b) {
              result.wineryExists = true;
            });
          }

          // check if we need to add the wine
          if (!result.matchedWines) {
            wine = {
              name: result.name.toString()
            };

            WineList.$add(wine).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function parseWineResult(result) {
          if (result.winery) {
            // check if winery exists
            $timeout(function() {
              WineryManager.searchByNameExact(result.winery, function(key, winery) {
                // only create object once a result is returned
                if (!result.matchedWineries) {
                  result.matchedWineries = {};
                }
                result.matchedWineries[key] = winery;
              });
            });
          }

          if (result.name) {
            // check if wine name exists
            $timeout(function() {
              WineManager.searchByNameExact(result.name, function(key, wine) {
                // only create object once a result is returned
                if (!result.matchedWines) {
                  result.matchedWines = {};
                }
                result.matchedWines[key] = wine;
              });
            });
          }

          scope.wines.push(result);
        }
      }
    };
  });
})();
