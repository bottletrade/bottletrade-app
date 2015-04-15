(function() {
  'use strict';

  angular.module('bottletrade').factory("BeerList",
    function($firebaseArray, firebaseRef) {
      var ref = firebaseRef("beers");

      // return it as a synchronized object
      return $firebaseArray(ref);
    }
  );
})();
