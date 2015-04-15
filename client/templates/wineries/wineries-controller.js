(function() {
  'use strict';

  angular.module('application').controller("WineriesCtrl",
    function($scope, $state, $stateParams, Winery, WineryList) {
      if ($stateParams.id) {
        $scope.winery = new Winery($stateParams.id);
      } else {
        $scope.wineries = WineryList;
      }

      $scope.createdWinery = function(winery) {
        $state.go('app.wineries', { id: winery.key() });
      };
  });
})();
