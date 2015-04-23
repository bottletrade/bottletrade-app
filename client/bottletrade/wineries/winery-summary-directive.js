(function() {
  'use strict';

  angular.module('bottletrade').directive('winerySummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wineries/winery-summary.html',
      scope: {
        winery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
