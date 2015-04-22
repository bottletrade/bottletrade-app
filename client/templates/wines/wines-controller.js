(function() {
  'use strict';

  angular.module('application').controller("WinesCtrl",
    function($scope, $state, $stateParams, Wine, WineList) {
      if ($stateParams.id) {
        $scope.wine = new Wine($stateParams.id);
      } else {
        $scope.wines = WineList;
      }

      $scope.created = function(wine) {
        $state.go('app.wines', { id: wine.key() });
      };
  });
})();
