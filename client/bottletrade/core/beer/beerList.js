(function() {
  'use strict';

  angular.module('bottletrade').factory("BeerList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("beers"));
    }
  );
})();
