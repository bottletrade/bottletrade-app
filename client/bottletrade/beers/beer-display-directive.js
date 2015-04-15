(function() {
  'use strict';

  angular.module('bottletrade').directive('beerDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/beer-display.html',
      scope: {
        beer: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
