(function() {
  'use strict';

  angular.module('bottletrade.spirits').factory("SpiritManager",
    function(firebaseRef, BTConstants, $firebaseArray) {
      return {
        searchByNameBegins: searchByNameBegins,
        searchByNameEnds: searchByNameEnds,
        searchByNameContains: searchByNameContains,
        searchByNameExact: searchByNameExact
      };

      function searchByNameBegins(name) {
        return _searchByName(name, "", "", "", "~");
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
        var nameLower, query;

        nameLower = name.toString().toLowerCase();
        query = firebaseRef(BTConstants.firebase.spirits).orderByChild('search_name')
                  .startAt(startPrefix + nameLower + startSuffix)
                  .endAt(endPrefix + nameLower + endSuffix);

        return $firebaseArray(query).$loaded();
      }
    }
  );
})();
