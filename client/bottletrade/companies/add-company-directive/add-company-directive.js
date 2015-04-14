(function() {
  'use strict';

  angular.module('bottletrade').directive('addCompany', function(BTService) {
    return {
      replace: true,
      templateUrl: '/bottletrade/companies/add-company-directive/add-company.html',
      scope: {
        type: '=',
        created: '&'
      },
      link: function(scope, element) {
        scope.company = {};

        scope.save = function() {
          switch (scope.type) {
            case BTConstants.companies.brewery:
              BTService.addBrewery(scope.company);
              break;
          }
          scope.created({ company: scope.company });
        };
      }
    };
  });
})();
