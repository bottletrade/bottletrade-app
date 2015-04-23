(function() {
  'use strict';

  angular.module('bottletrade').factory("Bottle",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("bottles", id));
      };
    }
  );
})();
