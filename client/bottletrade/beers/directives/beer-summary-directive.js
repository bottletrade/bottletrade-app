(function() {
  'use strict';

  angular.module('bottletrade.beers').directive('beerSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/directives/beer-summary.html',
      scope: {
        beer: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
