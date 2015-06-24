(function() {
  'use strict';

  angular.module('bottletrade.bottles').directive('bottleSummary', function($timeout, FoundationApi, BottleList) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/bottletrade/bottles/directives/bottle-summary.html',
      scope: {
        bottle: '=',
        removeBottle: '&'
      },
      link: function(scope, element) {
      }
    };
  });
})();
