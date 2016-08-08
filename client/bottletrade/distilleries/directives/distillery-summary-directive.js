(function() {
  'use strict';

  angular.module('bottletrade.distilleries').directive('distillerySummary', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/distilleries/directives/distillery-summary.html',
      scope: {
        distillery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
