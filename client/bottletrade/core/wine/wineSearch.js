(function() {
  'use strict';

  angular.module('bottletrade').factory("WineSearch",
    function(firebaseRef) {
      return {
        searchByName: searchByName
      };

      function searchByName(name, cb) {
        firebaseRef('wines').orderByChild('name').startAt(name).endAt(name + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key(), snapshot.val());
          }
        );
      }
    }
  );
})();
