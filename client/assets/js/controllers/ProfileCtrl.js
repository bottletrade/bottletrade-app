(function() {
  'use strict';

  angular.module('application').controller("ProfileCtrl", ['$scope', 'user', function($scope, user) {
    $scope.user = user;
  }]);

})();
