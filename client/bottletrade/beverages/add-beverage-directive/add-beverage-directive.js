(function() {
  'use strict';

  angular.module('bottletrade').directive('addBeverage', function(BTConstants, BTService) {
    return {
      replace: true,
      templateUrl: '/bottletrade/beverages/add-beverage-directive/add-beverage.html',
      scope: {
        type: '=',
        created: '&'
      },
      link: function(scope, element) {
        scope.beverage = {};

        scope.save = function() {
          switch (scope.type) {
            case BTConstants.beverages.beer:
              BTService.addBeer(scope.beverage);
              break;
          }
          scope.created({ beverage: scope.beverage });
        };
      }
    };
  });
})();
