(function() {
  'use strict';

  angular.module('application').controller("SearchCtrl",
    function($scope, $stateParams, SearchService) {
      if ($stateParams.query) {
        SearchService.setQuery($stateParams.query);
      }
      $scope.searchConfig = SearchService.getConfig();
  });
})();
