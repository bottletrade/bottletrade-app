(function() {
  'use strict';

  angular.module('bottletrade').factory("BottleList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("bottles"));
    }
  );
})();
