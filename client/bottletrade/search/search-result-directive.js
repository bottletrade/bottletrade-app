(function() {
  'use strict';

  angular.module('bottletrade').directive('searchResult', function() {
    return {
      replace: true,
      templateUrl: '/bottletrade/search/search-result.html',
      scope: {
        result: '=',
        query: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();