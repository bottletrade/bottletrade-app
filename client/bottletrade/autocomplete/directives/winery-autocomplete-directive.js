(function() {
  'use strict';

  angular.module('bottletrade.autocomplete').directive('wineryAutocomplete', function($timeout, FoundationApi, AutoCompleteManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/autocomplete/directives/winery-autocomplete.html',
      scope: {
        inputName: '@',
        selected: '='
      },
      link: function(scope, element, attrs) {
        scope.selected = null;
        scope.query = "";
        scope.uid = 'winery-autocomplete-' + FoundationApi.generateUuid();

        AutoCompleteManager.prepareWineryAutoComplete(scope);

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
