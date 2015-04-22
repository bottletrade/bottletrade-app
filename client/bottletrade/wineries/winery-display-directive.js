(function() {
  'use strict';

  angular.module('bottletrade').directive('wineryDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/wineries/winery-display.html',
      scope: {
        winery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
