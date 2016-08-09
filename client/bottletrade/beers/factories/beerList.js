(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("BeerList",
    function($firebaseArray, firebaseRef, BTConstants, Brewery) {
      // create a new service based on $firebaseArray
      var BeerList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          var brew = data.brewery;
          data.search_name = data.name.toLowerCase();
          if (!angular.isString(data.brewery)) {
            data.brewery = brew.$id;
          }
          return $firebaseArray.prototype.$add.call(this, data).then(function() {
            data.brewery = brew;
          });
        },
        "$$added": function(snapshot, prevChild) {
          // call the super
          var newChild = $firebaseArray.prototype.$$added.apply(this, arguments);

          if (newChild) {
            if (angular.isString(newChild.brewery)) {
              newChild.brewery = new Brewery(newChild.brewery);
            }
          }

          return newChild;
        },
        "$$updated": function(data) {
          // call the super
          var changed = $firebaseArray.prototype.$$updated.apply(this, arguments);

          if (changed) {
            if (angular.isString(data.brewery)) {
              data.brewery = new Brewery(data.brewery);
            }
          }

          return changed;
        }
      });

      return new BeerList(firebaseRef(BTConstants.firebase.beers));
    }
  );
})();
