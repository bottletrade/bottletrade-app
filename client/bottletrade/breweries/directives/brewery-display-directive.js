(function() {
  'use strict';

  angular.module('bottletrade.breweries').directive('breweryDisplay', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/breweries/directives/brewery-display.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
