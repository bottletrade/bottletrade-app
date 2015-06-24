(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("BeerManager",
    function(firebaseRef, BTConstants) {
      return {
        searchByNameBegins: searchByNameBegins,
        searchByNameEnds: searchByNameEnds,
        searchByNameContains: searchByNameContains,
        searchByNameExact: searchByNameExact,
        searchByNameExactFromBrewery: searchByNameExactFromBrewery
      };

      function searchByNameBegins(name, addedCallback, removedCallback) {
        _searchByName(name, null, "", "", "", "~", addedCallback, removedCallback);
      }

      function searchByNameEnds(name, addedCallback, removedCallback) {
        _searchByName(name, null, "~", "", "~", "", addedCallback, removedCallback);
      }

      function searchByNameContains(name, addedCallback, removedCallback) {
        _searchByName(name, null, "~", "~", "~", "~", addedCallback, removedCallback);
      }

      function searchByNameExact(name, addedCallback, removedCallback) {
        _searchByName(name, null, "", "", "", "", addedCallback, removedCallback);
      }

      function searchByNameExactFromBrewery(name, brewery, addedCallback, removedCallback) {
        _searchByName(name, brewery, "", "", "", "", addedCallback, removedCallback);
      }

      function _searchByName(name, brewery, startPrefix, startSuffix, endPrefix, endSuffix, addedCallback, removedCallback) {
        var nameLower, query;

        nameLower = name.toString().toLowerCase();
        query = firebaseRef(BTConstants.firebase.beers)
                  .orderByChild('search_name')
                  .startAt(startPrefix + nameLower + startSuffix)
                  .endAt(endPrefix + nameLower + endSuffix);

        if (addedCallback) {
          query.on('child_added', function(snapshot) {
            if (brewery && snapshot.val().brewery === brewery) {
              addedCallback(snapshot.key(), snapshot.val());
            }
          });
        }

        if (removedCallback) {
          query.on('child_removed', function(snapshot) {
            if (brewery && snapshot.val().brewery === brewery) {
              removedCallback(snapshot.key(), snapshot.val());
            }
          });
        }
      }
    }
  );
})();
