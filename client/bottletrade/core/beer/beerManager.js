(function() {
  'use strict';

  angular.module('bottletrade').factory("BeerManager",
    function($q, firebaseRef) {
      return {
        searchByName: searchByName,
        existsByName: existsByName
      };

      function searchByName(name, cb) {
        var nameLower = name.toString().toLowerCase();

        firebaseRef('beers').orderByChild('search_name').startAt(nameLower).endAt(nameLower + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key(), snapshot.val());
          }
        );
      }

      function existsByName(name) {
        var deferred = $q.defer(),
            nameLower = name.toString().toLowerCase();

        firebaseRef('beers').orderByChild('search_name').startAt(nameLower).endAt(nameLower)
          .once('value',  function(snapshot) {
            deferred.resolve(snapshot.exists());
          }
        );

        return deferred.promise;
      }
    }
  );
})();
