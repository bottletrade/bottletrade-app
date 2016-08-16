(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('breweryAutocomplete', function($timeout, BaseAppsApi, BreweryManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/brewery-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return BreweryManager.searchByNameBegins(val);
        };

        scope.clearResult = function() {
          scope.selected = null;
        };

        scope.selectResult = function(selected) {
          scope.selected = selected.originalObject;
        };
      }
    };
  });
})();
