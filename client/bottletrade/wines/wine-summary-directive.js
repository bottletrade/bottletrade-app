(function() {
  'use strict';

  angular.module('bottletrade').directive('wineSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wines/wine-summary.html',
      scope: {
        wine: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
