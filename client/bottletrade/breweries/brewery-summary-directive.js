(function() {
  'use strict';

  angular.module('bottletrade').directive('brewerySummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/breweries/brewery-summary.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
