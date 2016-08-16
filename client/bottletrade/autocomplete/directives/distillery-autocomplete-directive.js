(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('distilleryAutocomplete', function($timeout, BaseAppsApi, DistilleryManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/distillery-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return DistilleryManager.searchByNameBegins(val);
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
