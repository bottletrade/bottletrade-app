(function() {
  'use strict';

  angular.module('bottletrade.search').directive('searchResult', function() {
    return {
      replace: true,
      templateUrl: 'bottletrade/search/directives/search-result.html',
      scope: {
        result: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
