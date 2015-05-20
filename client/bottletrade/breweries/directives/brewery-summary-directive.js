(function() {
  'use strict';

  angular.module('bottletrade.breweries').directive('brewerySummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/breweries/directives/brewery-summary.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
