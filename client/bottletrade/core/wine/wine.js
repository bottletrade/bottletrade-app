(function() {
  'use strict';

  angular.module('bottletrade').factory("Wine",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Wine = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Wine(firebaseRef("wines", id));
      };
    }
  );
})();
