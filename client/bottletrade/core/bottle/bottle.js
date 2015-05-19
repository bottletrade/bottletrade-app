(function() {
  'use strict';

  angular.module('bottletrade').factory("Bottle",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        return $firebaseObject(firebaseRef(BTConstants.firebase.bottles, id));
      };
    }
  );
})();
