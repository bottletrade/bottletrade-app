(function() {
  'use strict';

  angular.module('bottletrade').directive('spiritSummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/spirits/spirit-summary.html',
      scope: {
        spirit: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
