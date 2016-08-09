(function() {
  'use strict';

  angular.module('bottletrade.bottles').factory("Bottle",
    function($rootScope, $firebaseObject, firebaseRef, BTConstants, Beer, Wine, Spirit) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Bottle = $firebaseObject.$extend({
          "$save": function() {
            // only store beverage ID not entire object
            var self = this, bev = this.beverage;
            this.beverage = bev.$id;
            return $firebaseObject.prototype.$save.call(this).then(function() {
              self.beverage = bev;
            });
          },
          "$$updated": function(snapshot) {
            // call the super
            var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

            if (changed) {
              if (angular.isString(this.beverage)) {
                switch (this.type) {
                  case "beer":
                    this.beverage = new Beer(this.beverage);
                    break;
                  case "wine":
                    this.beverage = new Wine(this.beverage);
                    break;
                  case "spirit":
                    this.beverage = new Spirit(this.beverage);
                    break;
                }
              }
            }

            return changed;
          }
        });

        return new Bottle(firebaseRef(BTConstants.firebase.bottles, $rootScope.user.uid, id));
      };
    }
  );
})();
