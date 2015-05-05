(function() {
  'use strict';

  angular.module('bottletrade').factory("Brewery",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Brewery = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Brewery(firebaseRef("breweries", id));
      };
    }
  );
})();
