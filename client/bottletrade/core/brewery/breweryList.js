(function() {
  'use strict';

  angular.module('bottletrade').factory("BreweryList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("breweries"));
    }
  );
})();
