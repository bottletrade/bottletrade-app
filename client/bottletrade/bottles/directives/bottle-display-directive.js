(function() {
  'use strict';

  angular.module('bottletrade.bottles').directive('bottleDisplay', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/directives/bottle-display.html',
      scope: {
        bottle: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
