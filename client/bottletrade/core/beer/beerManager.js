(function() {
  'use strict';

  angular.module('bottletrade').factory("BeerManager",
    function(firebaseRef, BTConstants) {
      return {
        searchByNameBegins: searchByNameBegins,
        searchByNameEnds: searchByNameEnds,
        searchByNameContains: searchByNameContains,
        searchByNameExact: searchByNameExact
      };

      function searchByNameBegins(name, addedCallback, removedCallback) {
        _searchByName(name, "", "", "", "~", addedCallback, removedCallback);
      }

      function searchByNameEnds(name, addedCallback, removedCallback) {
        _searchByName(name, "~", "", "~", "", addedCallback, removedCallback);
      }

      function searchByNameContains(name, addedCallback, removedCallback) {
        _searchByName(name, "~", "~", "~", "~", addedCallback, removedCallback);
      }

      function searchByNameExact(name, addedCallback, removedCallback) {
        _searchByName(name, "", "", "", "", addedCallback, removedCallback);
      }

      function _searchByName(name, startPrefix, startSuffix, endPrefix, endSuffix, addedCallback, removedCallback) {
        var nameLower, query;

        nameLower = name.toString().toLowerCase();
        query = firebaseRef(BTConstants.firebase.beers)
                  .orderByChild('search_name')
                  .startAt(startPrefix + nameLower + startSuffix)
                  .endAt(endPrefix + nameLower + endSuffix);

        if (addedCallback) {
          query.on('child_added', function(snapshot) {
            addedCallback(snapshot.key(), snapshot.val());
          });
        }

        if (removedCallback) {
          query.on('child_removed', function(snapshot) {
            removedCallback(snapshot.key(), snapshot.val());
          });
        }
      }
    }
  );
})();
