(function() {
  'use strict';

  angular.module('bottletrade').directive('beerSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/beers/beer-summary.html',
      scope: {
        beer: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
