(function() {
  'use strict';

  angular.module('bottletrade').factory("Beer",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("beers", id));
      };
    }
  );
})();
