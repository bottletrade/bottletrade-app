(function() {
  'use strict';

  angular.module('application').controller("IndexCtrl", ['$scope', '$timeout', 'FoundationApi', 'user',
                                                         function($scope, $timeout, foundationApi, user) {
	  $scope.user = user;

	  $scope.closeMenu = function() {
		  $timeout(function() {
			  foundationApi.publish('menu', 'close');
		  });
	  };
	  $scope.toggleMenu = function() {
		  $timeout(function() {
			  foundationApi.publish('menu', 'toggle');
		  });
	  };
  }]);

})();
