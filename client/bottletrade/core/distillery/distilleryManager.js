(function() {
  'use strict';

  angular.module('bottletrade').factory("DistilleryManager",
    function(firebaseRef, BTConstants) {
      return {
        searchByNameBegins: searchByNameBegins,
        searchByNameEnds: searchByNameEnds,
        searchByNameContains: searchByNameContains,
        searchByNameExact: searchByNameExact
      };

      function searchByNameBegins(name) {
        return _searchByName(name, "", "~", "", "~");
      }

      function searchByNameEnds(name) {
        return _searchByName(name, "~", "", "~", "");
      }

      function searchByNameContains(name) {
        return _searchByName(name, "~", "~", "~", "~");
      }

      function searchByNameExact(name) {
        return _searchByName(name, "", "", "", "");
      }

      function _searchByName(name, startPrefix, startSuffix, endPrefix, endSuffix) {
        var deferred = $q.defer(),
            nameLower = name.toString().toLowerCase();

        firebaseRef(BTConstants.firebase.distilleries).orderByChild('search_name')
          .startAt(startPrefix + nameLower + startSuffix)
          .endAt(endPrefix + nameLower + endSuffix)
          .on('child_added',  function(snapshot) {
            deferred.resolve(snapshot.key(), snapshot.val());
          }
        );

        return deferred.promise;
      }
    }
  );
})();
