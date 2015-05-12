(function() {
  'use strict';

  angular.module('bottletrade').factory("DistilleryManager",
    function(firebaseRef) {
      return {
        searchByName: searchByName
      };

      function searchByName(name, cb) {
        firebaseRef('distilleries').orderByChild('search_name').startAt(name).endAt(name + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key(), snapshot.val());
          }
        );
      }
    }
  );
})();
