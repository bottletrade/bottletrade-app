(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('spiritAutocomplete', function($timeout, BaseAppsApi, SpiritManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/spirit-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return SpiritManager.searchByNameBegins(val);
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
