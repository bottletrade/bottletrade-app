(function() {
  'use strict';

  angular.module('bottletrade.bottles').directive('addBottle', function(BottleList) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'bottletrade/bottles/directives/add-bottle.html',
      scope: {
        beer: '=?',
        wine: '=?',
        spirit: '=?',
        bottle: '=?',
        created: '&',
        updated: '&'
      },
      link: function(scope, element, attrs) {
        scope.isNew = !attrs.bottle;

        if (scope.isNew) {
          scope.bottle = {
            description: ""
          };

          if (attrs.beer) {
            scope.bottle.type = "beer";
            scope.bottle.beverage = scope.beer;
          } else if (attrs.wine) {
            scope.bottle.type = "wine";
            scope.bottle.beverage = scope.wine;
          } else if (attrs.spirit) {
            scope.bottle.type = "spirit";
            scope.bottle.beverage = scope.spirit;
          }
        }

        scope.save = function() {
          if (scope.isNew) {
            (new BottleList()).$add(scope.bottle).then(function(bottle) {
              scope.created({ bottle: scope.bottle });
            });
          } else {
            scope.bottle.$save().then(function() {
              scope.updated({ bottle: scope.bottle });
            });
          }
        };
      }
    };
  });
})();
