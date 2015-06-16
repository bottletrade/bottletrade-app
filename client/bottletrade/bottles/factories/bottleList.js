(function() {
  'use strict';

  angular.module('bottletrade.bottles').factory("BottleList",
    function($rootScope, $firebaseArray, firebaseRef, BTConstants, Beer, Wine, Spirit) {
      // create a new service based on $firebaseArray
      var BottleList = $firebaseArray.$extend({
        "$add": function(data) {
          // only store beverage ID not entire object
          data.beverage = data.beverage.$id;
          return $firebaseArray.prototype.$add.call(this, data);
        },
        "$$updated": function(data) {
          // call the super
          var changed = $firebaseArray.prototype.$$updated.apply(this, arguments);

          if (changed) {
            switch (data.type) {
              case "beer":
                data.beverage = new Beer(data.beverage);
                break;
              case "wine":
                data.beverage = new Wine(data.beverage);
                break;
              case "spirit":
                data.beverage = new Spirit(data.beverage);
                break;
            }
          }

          return changed;
        }
      });

      return function() {
        if ($rootScope.user) {
          return new BottleList(firebaseRef(BTConstants.firebase.bottles, $rootScope.user.auth.uid));
        } else {
          return null;
        }
      };
    }
  );
})();
