(function() {
  'use strict';

  angular.module('bottletrade').factory("Brewery",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        var ref = firebaseRef("breweries");
        var profileRef = ref.child(id);

        // return it as a synchronized object
        return $firebaseObject(profileRef);
      };
    }
  );
})();
