(function() {
  'use strict';

  angular.module('bottletrade.breweries').directive('breweryDisplay', function(BeerManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/breweries/directives/brewery-display.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
        BeerManager.searchByBrewery(scope.brewery.$id).then(function(beers) {
          scope.beers = beers;
        });
      }
    };
  });
})();
