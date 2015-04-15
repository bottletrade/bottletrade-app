(function() {
  'use strict';

  angular.module('bottletrade').factory("Brewery",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("breweries", id));
      };
    }
  );
})();
