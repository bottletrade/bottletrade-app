(function() {
  'use strict';

  angular.module('bottletrade.wineries').directive('winerySummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wineries/directives/winery-summary.html',
      scope: {
        winery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
