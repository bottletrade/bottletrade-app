(function() {
  'use strict';

  angular.module('bottletrade').directive('addBrewery', function(BreweryList, Brewery) {
    return {
      replace: true,
      templateUrl: '/bottletrade/breweries/add-brewery.html',
      scope: {
        created: '&',
        brewery: '=?',
        updated: '&'
      },
      link: function(scope, element, attrs) {
        scope.isNew = !attrs.brewery;

        if (scope.isNew) {
          scope.brewery = {};
        }

        scope.save = function() {
          if (scope.isNew) {
            BreweryList.$add(scope.brewery).then(function(brewery) {
              scope.created({ brewery: brewery });
            });
          } else {
            scope.brewery.$save().then(function(brewery) {
              scope.updated({ brewery: brewery });
            });
          }
        };
      }
    };
  });
})();
