(function() {
  'use strict';

  angular.module('bottletrade.bottles').directive('addBottle', function(BottleList) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/directives/add-bottle.html',
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
