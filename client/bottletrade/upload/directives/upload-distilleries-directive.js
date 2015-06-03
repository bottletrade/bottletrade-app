(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadDistilleries',
  function($timeout, DistilleryList, DistilleryManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-distilleries.html',
      scope: {
        fileData: '=',
        distilleries: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseDistilleryResult(result);
        });

        scope.save = function() {
          scope.distilleries.forEach(function(result) {
            addParsedDistilleryResult(result);
          });
        };

        function addParsedDistilleryResult(result) {
          var distillery;

          // check if we need to add the distillery
          if (!result.matchedDistilleries) {
            distillery = {
              name: result.name.toString()
            };

            DistilleryList.$add(distillery).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function parseDistilleryResult(result) {
          if (result.name) {
            // check if distillery name exists
            $timeout(function() {
              DistilleryManager.searchByNameExact(result.name, function(key, distillery) {
                // only create object once a result is returned
                if (!result.matchedDistilleries) {
                  result.matchedDistilleries = {};
                }
                result.matchedDistilleries[key] = distillery;
              });
            });
          }

          scope.distilleries.push(result);
        }
      }
    };
  });
})();
