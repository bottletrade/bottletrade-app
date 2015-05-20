(function() {
  'use strict';

  angular.module('bottletrade.wines').directive('wineDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wines/directives/wine-display.html',
      scope: {
        wine: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
