(function() {
  'use strict';

  angular.module('bottletrade').directive('breweryDisplay', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/breweries/brewery-display.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
