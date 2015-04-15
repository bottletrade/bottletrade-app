(function() {
  'use strict';

  angular.module('application').controller("SpiritsCtrl",
    function($scope, $state, $stateParams, Spirit, SpiritList) {
      if ($stateParams.id) {
        $scope.spirit = new Spirit($stateParams.id);
      } else {
        $scope.spirits = SpiritList;
      }

      $scope.createdSpirit = function(spirit) {
        $state.go('app.spirits', { id: spirit.key() });
      };
  });
})();
