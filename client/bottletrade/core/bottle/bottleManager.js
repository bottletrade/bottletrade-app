(function() {
  'use strict';

  angular.module('bottletrade').factory("BottleManager",
    function(firebaseRef, BTConstants) {
      return {
        searchByDescription: searchByDescription
      };

      function searchByDescription(desc, cb) {
        firebaseRef(BTConstants.firebase.bottles).orderByChild('description').startAt("~" + desc).endAt("~" + desc + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key(), snapshot.val());
          }
        );
      }
    }
  );
})();
