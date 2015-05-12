(function() {
  'use strict';

  angular.module('bottletrade').factory("BottleManager",
    function(firebaseRef) {
      return {
        searchByDescription: searchByDescription
      };

      function searchByDescription(desc, cb) {
        firebaseRef('bottles').orderByChild('description').startAt("~" + desc).endAt("~" + desc + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key(), snapshot.val());
          }
        );
      }
    }
  );
})();
