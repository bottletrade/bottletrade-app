(function() {
  'use strict';

  angular.module('bottletrade.beers').directive('addBeer', function(FoundationApi, BeerList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/directives/add-beer.html',
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

        scope.$watch('brewedBy', function(newVal, oldVal) {

        });

        scope.save = function() {
          scope.add_beer_form.$submitted=true;
          if (scope.add_beer_form.$valid) {
            if (scope.isNew) {
              BeerList.$add(scope.beer).then(function(beer) {
                scope.created({ beer: beer });
              });
            } else {
              scope.beer.$save().then(function(beer) {
                scope.updated({ beer: beer });
              });
            }
          }
        };
      }
    };
  });
})();
