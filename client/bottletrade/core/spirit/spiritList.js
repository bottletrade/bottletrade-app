(function() {
  'use strict';

  angular.module('bottletrade').factory("SpiritList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("spirits"));
    }
  );
})();
