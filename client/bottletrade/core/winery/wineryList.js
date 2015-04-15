(function() {
  'use strict';

  angular.module('bottletrade').factory("WineryList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("wineries"));
    }
  );
})();
