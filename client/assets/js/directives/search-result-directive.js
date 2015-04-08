(function() {
  'use strict';

  angular.module('application').directive('searchResult', function() {
    return {
      replace: true,
      templateUrl: 'partials/search-result.html',
      scope: {
        result: '=',
        query: '='
      },
      link: function(scope, element) {
      }
    };
  });
})();
