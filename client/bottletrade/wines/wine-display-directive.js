(function() {
  'use strict';

  angular.module('bottletrade').directive('wineDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wines/wine-display.html',
      scope: {
        wine: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
