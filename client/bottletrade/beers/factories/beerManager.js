(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("BeerManager",
    function($firebaseArray, $q, firebaseRef, BTConstants) {
      return {
        searchByNameBegins: searchByNameBegins,
        searchByNameEnds: searchByNameEnds,
        searchByNameContains: searchByNameContains,
        searchByNameExact: searchByNameExact,
        searchByNameExactFromBrewery: searchByNameExactFromBrewery,
        searchByBrewery: searchByBrewery
      };

      function searchByBrewery(brewery) {
        return _searchByBrewery(brewery);
      }

      function searchByNameBegins(name) {
        return _searchByName(name, null, "", "", "", "~");
      }

      function searchByNameEnds(name) {
        return _searchByName(name, null, "~", "", "~", "");
      }

      function searchByNameContains(name) {
        return _searchByName(name, null, "~", "~", "~", "~");
      }

      function searchByNameExact(name) {
        return _searchByName(name, null, "", "", "", "");
      }

      function searchByNameExactFromBrewery(name, brewery) {
        return _searchByName(name, brewery, "", "", "", "");
      }

      function _searchByName(name, brewery, startPrefix, startSuffix, endPrefix, endSuffix) {
        var nameLower, query;

        nameLower = name.toString().toLowerCase();
        query = firebaseRef(BTConstants.firebase.beers)
                  .orderByChild('search_name')
                  .startAt(startPrefix + nameLower + startSuffix)
                  .endAt(endPrefix + nameLower + endSuffix);

        var deferred = $q.defer();
        $firebaseArray(query).$loaded().then(function(results) {
          if (brewery) {
            deferred.resolve(results.filter(function(r) {
              return r.brewery === brewery;
            }));
          } else {
            deferred.resolve(results);
          }
        }, deferred.reject);
        return deferred.promise;
      }

      function _searchByBrewery(brewery) {
        var query = firebaseRef(BTConstants.firebase.beers)
                  .orderByChild('brewery')
                  .startAt(brewery)
                  .endAt(brewery);

        return $firebaseArray(query).$loaded();
      }
    }
  );
})();
