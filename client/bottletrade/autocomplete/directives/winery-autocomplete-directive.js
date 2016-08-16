(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('wineryAutocomplete', function($timeout, BaseAppsApi, WineryManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/winery-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return WineryManager.searchByNameBegins(val);
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
