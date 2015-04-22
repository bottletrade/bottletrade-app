(function() {
  'use strict';

  angular.module('bottletrade').directive('addWine', function(WineList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/wines/add-wine.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.wine = {
          name: ""
        };

        scope.save = function() {
          WineList.$add(scope.wine).then(function(wine) {
            scope.created({ wine: wine });
          });
        };
      }
    };
  });
})();
