(function() {
  'use strict';

  angular.module('bottletrade.distilleries').directive('distilleryDisplay', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/distilleries/directives/distillery-display.html',
      scope: {
        distillery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
