(function() {
  'use strict';

  angular.module('bottletrade.wineries').directive('addWinery', function(WineryList) {
    return {
      replace: true,
      templateUrl: 'bottletrade/wineries/directives/add-winery.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.winery = {
          name: ""
        };

        scope.save = function() {
          WineryList.$add(scope.winery).then(function(winery) {
            scope.created({ winery: winery });
          });
        };
      }
    };
  });
})();
