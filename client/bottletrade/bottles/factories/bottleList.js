(function() {
  'use strict';

  angular.module('bottletrade.bottles').factory("BottleList",
    function($firebaseArray, firebaseRef, BTConstants) {
      return $firebaseArray(firebaseRef(BTConstants.firebase.bottles));
    }
  );
})();
