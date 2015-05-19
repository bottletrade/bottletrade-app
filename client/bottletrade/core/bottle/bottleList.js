(function() {
  'use strict';

  angular.module('bottletrade').factory("BottleList",
    function($firebaseArray, firebaseRef, BTConstants) {
      return $firebaseArray(firebaseRef(BTConstants.firebase.bottles));
    }
  );
})();
