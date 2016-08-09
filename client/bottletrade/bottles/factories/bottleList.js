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
        "$$added": function(snapshot, prevChild) {
          // call the super
          var newChild = $firebaseArray.prototype.$$added.apply(this, arguments);

          if (newChild) {
            switch (newChild.type) {
              case "beer":
                newChild.beverage = new Beer(newChild.beverage);
                break;
              case "wine":
                newChild.beverage = new Wine(newChild.beverage);
                break;
              case "spirit":
                newChild.beverage = new Spirit(newChild.beverage);
                break;
            }
          }

          return newChild;
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
          return new BottleList(firebaseRef(BTConstants.firebase.bottles, $rootScope.user.uid));
        } else {
          return null;
        }
      };
    }
  );
})();
