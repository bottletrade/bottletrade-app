(function() {
  'use strict';

  angular.module('bottletrade').directive('bottleDisplay', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/bottle-display.html',
      scope: {
        bottle: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
