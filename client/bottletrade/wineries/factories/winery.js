(function() {
  'use strict';

  angular.module('bottletrade.wineries').factory("Winery",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Winery = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Winery(firebaseRef(BTConstants.firebase.wineries, id));
      };
    }
  );
})();
