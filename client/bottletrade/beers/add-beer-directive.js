(function() {
  'use strict';

  angular.module('bottletrade').directive('addBeer', function(BeerList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/add-beer.html',
      scope: {
        created: '&',
        beer: '=?',
        updated: '&'
      },
      link: function(scope, element, attrs) {
        scope.isNew = !attrs.beer;

        if (scope.isNew) {
          scope.beer = {};
        }

        scope.save = function() {
          if (scope.isNew) {
            BeerList.$add(scope.beer).then(function(beer) {
              scope.created({ beer: beer });
            });
          } else {
            scope.beer.$save().then(function(beer) {
              scope.updated({ beer: beer });
            });
          }
        };
      }
    };
  });
})();
