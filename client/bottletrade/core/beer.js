(function() {
  'use strict';

  angular.module('bottletrade').factory("Beer",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        var ref = firebaseRef("beers");
        var profileRef = ref.child(id);

        // return it as a synchronized object
        return $firebaseObject(profileRef);
      };
    }
  );
})();
