(function() {
  'use strict';

  angular.module('bottletrade').directive('distillerySummary', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/distilleries/distillery-summary.html',
      scope: {
        distillery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
