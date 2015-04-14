(function() {
  'use strict';

  angular.module('bottletrade').directive('beerInfo', function(BTService) {
    return {
      replace: true,
      templateUrl: '/bottletrade/beverages/beer-info-directive/beer-info.html',
      scope: {
        beer: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
