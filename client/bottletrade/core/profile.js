(function() {
  'use strict';

  angular.module('bottletrade').factory("Profile",
    function($firebaseObject, FirebaseRef) {
      return function(username) {
        var ref = new FirebaseRef("profile");
        var profileRef = ref.child(username);

        // return it as a synchronized object
        return $firebaseObject(profileRef);
      };
    }
  );
})();
