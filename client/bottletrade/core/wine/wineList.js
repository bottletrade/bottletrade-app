(function() {
  'use strict';

  angular.module('bottletrade').factory("WineList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("wines"));
    }
  );
})();
