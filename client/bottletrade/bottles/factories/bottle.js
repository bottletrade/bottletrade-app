(function() {
  'use strict';

  angular.module('bottletrade.bottles').factory("Bottle",
    function($rootScope, $firebaseObject, firebaseRef, BTConstants, Beer, Wine, Spirit) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Bottle = $firebaseObject.$extend({
          "$save": function() {
            // only store beverage ID not entire object
            this.beverage = this.beverage.$id;
            return $firebaseObject.prototype.$save.call(this);
          },
          "$$updated": function(snapshot) {
            // call the super
            var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

            if (changed) {
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

            return changed;
          }
        });

        return new Bottle(firebaseRef(BTConstants.firebase.bottles, $rootScope.user.auth.uid, id));
      };
    }
  );
})();
