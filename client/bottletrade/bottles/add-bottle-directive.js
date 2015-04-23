(function() {
  'use strict';

  angular.module('bottletrade').directive('addBottle', function(BottleList) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/add-bottle.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.bottle = {
          description: ""
        };

        scope.save = function() {
          BottleList.$add(scope.bottle).then(function(bottle) {
            scope.created({ bottle: bottle });
          });
        };
      }
    };
  });
})();
