(function() {
  'use strict';

  angular.module('bottletrade.spirits').directive('addSpirit', function(SpiritList) {
    return {
      replace: true,
      templateUrl: '/bottletrade/spirits/directives/add-spirit.html',
      scope: {
        created: '&'
      },
      link: function(scope, element) {
        scope.spirit = {
          name: ""
        };

        scope.save = function() {
          SpiritList.$add(scope.spirit).then(function(spirit) {
            scope.created({ spirit: spirit });
          });
        };
      }
    };
  });
})();
