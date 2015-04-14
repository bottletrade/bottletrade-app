(function() {
  'use strict';

  angular.module('application').controller("IndexCtrl", function($scope, $rootScope, $timeout, FoundationApi, user) {
	  $scope.user = user;
    $scope.search = "";

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
