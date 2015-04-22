(function() {
  'use strict';

  angular.module('bottletrade').directive('spiritDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/spirits/spirit-display.html',
      scope: {
        spirit: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
