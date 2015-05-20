(function() {
  'use strict';

  angular.module('bottletrade.breweries').factory("Brewery",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Brewery = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Brewery(firebaseRef(BTConstants.firebase.breweries, id));
      };
    }
  );
})();
