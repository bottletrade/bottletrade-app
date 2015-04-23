(function() {
  'use strict';

  angular.module('bottletrade').directive('bottleSummary', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/bottle-summary.html',
      scope: {
        bottle: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
