(function() {
  'use strict';

  angular.module('application').controller("CompanyCtrl",
    function($scope, $state, $stateParams, lodash, BTConstants) {
      if ($state.includes("app.brewery")) {
        $scope.compType = BTConstants.companies.brewery;
      } else if ($state.includes("app.winery")) {
        $scope.compType = BTConstants.companies.winery;
      } else if ($state.includes("app.distillery")) {
        $scope.compType = BTConstants.companies.distillery;
      }

      $scope.createdCompany = function(company) {
        $state.go('app.brewery', { id: company.id });
      };

      $scope.brewery = lodash.find(BTService.getBreweries(), function(beer) {
        return beer.id == $stateParams.id;
      });
  });
})();
