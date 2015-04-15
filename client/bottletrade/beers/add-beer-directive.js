(function() {
  'use strict';

  angular.module('bottletrade').directive('addBeer', function(BeerList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/add-beer.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.beer = {
          name: ""
        };

        scope.save = function() {
          BeerList.$add(scope.beer).then(function(beer) {
            scope.created({ beer: beer });
          });
        };
      }
    };
  });
})();
