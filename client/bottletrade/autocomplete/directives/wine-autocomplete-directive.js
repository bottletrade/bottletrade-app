(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('wineAutocomplete', function($timeout, FoundationApi, AutoCompleteManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/autocomplete/directives/wine-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.selected = null;
        scope.query = "";
        scope.uid = 'wine-autocomplete-' + FoundationApi.generateUuid();

        AutoCompleteManager.prepareWineAutoComplete(scope);

        scope.$watchCollection('results', function(newVal, oldVal) {
          if (oldVal.length === 0 && newVal && newVal.length > 0) {
      		  $timeout(function() {
              FoundationApi.publish(scope.uid, 'show');
      		  });
          }

          if (newVal.length === 0) {
      		  $timeout(function() {
              FoundationApi.publish(scope.uid, 'hide');
      		  });
          }
        });

        scope.selectResult = function(result) {
          scope.selected = result;
          scope.query = result.name;
        };

        scope.clearResult = function() {
          scope.selected = false;
          scope.query = "";
        };
      }
    };
  });
})();