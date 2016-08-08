(function() {
  'use strict';

  angular.module('bottletrade.beers').directive('beerDisplay', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/beers/directives/beer-display.html',
      scope: {
        beer: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
