(function() {
  'use strict';

  angular.module('bottletrade').directive('addBrewery', function(BreweryList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/breweries/add-brewery.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.brewery = {
          name: ""
        };

        scope.save = function() {
          BreweryList.$add(scope.brewery).then(function(brewery) {
            scope.created({ brewery: brewery });
          });
        };
      }
    };
  });
})();
