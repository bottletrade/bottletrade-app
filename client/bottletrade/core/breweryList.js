(function() {
  'use strict';

  angular.module('bottletrade').factory("BreweryList",
    function($firebaseArray, firebaseRef) {
      var ref = firebaseRef("breweries");

      // return it as a synchronized object
      return $firebaseArray(ref);
    }
  );
})();
