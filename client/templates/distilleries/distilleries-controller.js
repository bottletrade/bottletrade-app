(function() {
  'use strict';

  angular.module('application').controller("DistilleriesCtrl",
    function($scope, $state, $stateParams, Distillery, DistilleryList) {
      if ($stateParams.id) {
        $scope.distillery = new Distillery($stateParams.id);
      } else {
        $scope.distilleries = DistilleryList;
      }

      $scope.createdDistillery = function(distillery) {
        $state.go('app.distilleries', { id: distillery.key() });
      };
  });
})();
