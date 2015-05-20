(function() {
  'use strict';

  angular.module('bottletrade.distilleries').directive('addDistillery', function(DistilleryList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/distilleries/directives/add-distillery.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.distillery = {
          name: ""
        };

        scope.save = function() {
          DistilleryList.$add(scope.distillery).then(function(distillery) {
            scope.created({ distillery: distillery });
          });
        };
      }
    };
  });
})();
