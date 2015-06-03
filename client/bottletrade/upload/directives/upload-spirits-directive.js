(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadSpirits',
  function($timeout, DistilleryList, SpiritList, DistilleryManager, SpiritManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-spirits.html',
      scope: {
        fileData: '=',
        spirits: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseSpiritResult(result);
        });

        scope.save = function() {
          scope.spirits.forEach(function(result) {
            addParsedSpiritResult(result);
          });
        };

        function addParsedSpiritResult(result) {
          var spirit, distillery;

          // check if we need to add the distillery
          if (!result.matchedDistilleries) {
            distillery = {
              name: result.distillery.toString()
            };

            DistilleryList.$add(distillery).then(function(b) {
              result.distilleryExists = true;
            });
          }

          // check if we need to add the spirit
          if (!result.matchedSpirits) {
            spirit = {
              name: result.name.toString()
            };

            SpiritList.$add(spirit).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function parseSpiritResult(result) {
          if (result.distillery) {
            // check if distillery exists
            $timeout(function() {
              WineryManager.searchByNameExact(result.distillery, function(key, distillery) {
                // only create object once a result is returned
                if (!result.matchedDistilleries) {
                  result.matchedDistilleries = {};
                }
                result.matchedDistilleries[key] = distillery;
              });
            });
          }

          if (result.name) {
            // check if spirit name exists
            $timeout(function() {
              SpiritManager.searchByNameExact(result.name, function(key, spirit) {
                // only create object once a result is returned
                if (!result.matchedSpirits) {
                  result.matchedSpirits = {};
                }
                result.matchedSpirits[key] = spirit;
              });
            });
          }

          scope.spirits.push(result);
        }
      }
    };
  });
})();
