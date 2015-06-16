(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("Beer",
    function($firebaseObject, firebaseRef, BTConstants, Brewery) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Beer = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name and brewery
            this.search_name = this.name.toLowerCase();
            this.brewery = this.brewery.$id;
            return $firebaseObject.prototype.$save.call(this);
          },
          "$$updated": function(snapshot) {
            // call the super
            var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

            if (changed) {
              this.brewery = new Brewery(this.brewery);
            }

            return changed;
          }
        });

        return new Beer(firebaseRef(BTConstants.firebase.beers, id));
      };
    }
  );
})();
