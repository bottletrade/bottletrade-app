(function() {
  'use strict';

  angular.module('bottletrade.spirits').directive('spiritSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/spirits/directives/spirit-summary.html',
      scope: {
        spirit: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
