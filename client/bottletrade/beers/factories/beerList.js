(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("BeerList",
    function($firebaseArray, firebaseRef, BTConstants) {
      // create a new service based on $firebaseArray
      var BeerList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          data.search_name = data.name.toLowerCase();
          data.brewery = data.brewery.$id;
          return $firebaseArray.prototype.$add.call(this, data);
        },
        "$$updated": function(data) {
          // call the super
          var changed = $firebaseArray.prototype.$$updated.apply(this, arguments);

          if (changed) {
            data.brewery = new Brewery(data.brewery);
          }

          return changed;
        }
      });

      return new BeerList(firebaseRef(BTConstants.firebase.beers));
    }
  );
})();
