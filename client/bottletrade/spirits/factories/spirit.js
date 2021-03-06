(function() {
  'use strict';

  angular.module('bottletrade.spirits').factory("Spirit",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Spirit = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Spirit(firebaseRef(BTConstants.firebase.spirits, id));
      };
    }
  );
})();
