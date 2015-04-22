(function() {
  'use strict';

  angular.module('bottletrade').directive('distilleryDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/distilleries/distillery-display.html',
      scope: {
        distillery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
