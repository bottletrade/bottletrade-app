(function() {
  'use strict';

  angular.module('bottletrade.bottles').directive('bottleSummary', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/directives/bottle-summary.html',
      scope: {
        bottle: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
