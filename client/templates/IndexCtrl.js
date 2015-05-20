(function() {
  'use strict';

  angular.module('application').controller("IndexCtrl", function($scope, $state, $timeout, Auth, FoundationApi, SearchService, user) {
    $scope.auth = Auth;
    $scope.searchConfig = SearchService.getConfig();

    $scope.$watch("searchConfig.query", function(query) {
      if ($state.includes("app.search")) {
        // already at search page, set url
        $state.go("app.search", { query: query }, { notify: false });
      } else {
        // not at search page, redirect to search page if query is provided
        if (query) {
          $state.go("app.search", { query: query });
        }
      }
    });

	  $scope.closeMenu = function() {
		  $timeout(function() {
			  FoundationApi.publish('menu', 'close');
		  });
	  };
	  $scope.toggleMenu = function() {
		  $timeout(function() {
			  FoundationApi.publish('menu', 'toggle');
		  });
	  };
  });
})();
