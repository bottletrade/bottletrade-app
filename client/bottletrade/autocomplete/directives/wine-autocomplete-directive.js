(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('wineAutocomplete', function($timeout, FoundationApi, WineManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/wine-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return WineManager.searchByNameBegins(val);
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
