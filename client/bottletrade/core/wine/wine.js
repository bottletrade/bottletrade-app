(function() {
  'use strict';

  angular.module('bottletrade').factory("Wine",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("wines", id));
      };
    }
  );
})();
