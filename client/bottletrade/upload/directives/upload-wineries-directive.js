(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadWineries',
  function($timeout, WineryList, WineryManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-wineries.html',
      scope: {
        fileData: '=',
        wineries: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseBeerResult(result);
        });

        scope.save = function() {
          scope.wineries.forEach(function(result) {
            addParsedWineryResult(result);
          });
        };

        function addParsedWineryResult(result) {
          var winery;

          // check if we need to add the winery
          if (!result.matchedWineries) {
            winery = {
              name: result.name.toString()
            };

            WineryList.$add(winery).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function parseWineryResult(result) {
          if (result.name) {
            // check if winery name exists
            $timeout(function() {
              WineryManager.searchByNameExact(result.name, function(key, winery) {
                // only create object once a result is returned
                if (!result.matchedWineries) {
                  result.matchedWineries = {};
                }
                result.matchedWineries[key] = winery;
              });
            });
          }

          scope.wineries.push(result);
        }
      }
    };
  });
})();
