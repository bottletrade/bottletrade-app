(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("Beer",
    function($firebaseObject, firebaseRef, BTConstants, Brewery) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Beer = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name and brewery
            var self = this, brew = this.brewery;
            this.search_name = this.name.toLowerCase();
            if (!angular.isString(this.brewery)) {
              this.brewery = brew.$id;
            }
            return $firebaseObject.prototype.$save.call(this).then(function() {
              self.brewery = brew;
            });
          },
          "$$updated": function(snapshot) {
            // call the super
            var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

            if (changed) {
              if (angular.isString(this.brewery)) {
                this.brewery = new Brewery(this.brewery);
              }
            }

            return changed;
          }
        });

        return new Beer(firebaseRef(BTConstants.firebase.beers, id));
      };
    }
  );
})();
