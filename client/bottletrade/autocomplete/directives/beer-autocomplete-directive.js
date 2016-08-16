(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('beerAutocomplete', function($timeout, BaseAppsApi, BeerManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/autocomplete/directives/beer-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.runSearch = function(val) {
          return BeerManager.searchByNameBegins(val);
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
