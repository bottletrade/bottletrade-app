(function() {
  'use strict';

  angular.module('bottletrade.wineries').directive('wineryDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wineries/directives/winery-display.html',
      scope: {
        winery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
