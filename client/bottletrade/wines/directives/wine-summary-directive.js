(function() {
  'use strict';

  angular.module('bottletrade.wines').directive('wineSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wines/directives/wine-summary.html',
      scope: {
        wine: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
