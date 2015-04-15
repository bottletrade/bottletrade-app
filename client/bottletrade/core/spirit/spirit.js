(function() {
  'use strict';

  angular.module('bottletrade').factory("Spirit",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("spirits", id));
      };
    }
  );
})();
