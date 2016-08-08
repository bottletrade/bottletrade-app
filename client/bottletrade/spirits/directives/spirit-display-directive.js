(function() {
  'use strict';

  angular.module('bottletrade.spirits').directive('spiritDisplay', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/spirits/directives/spirit-display.html',
      scope: {
        spirit: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
