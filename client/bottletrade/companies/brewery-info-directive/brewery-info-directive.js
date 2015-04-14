(function() {
  'use strict';

  angular.module('bottletrade').directive('breweryInfo', function(BTService) {
    return {
      replace: true,
      templateUrl: '/bottletrade/companies/brewery-info-directive/brewery-info.html',
      scope: {
        brewery: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
