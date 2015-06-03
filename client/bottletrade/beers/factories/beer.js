(function() {
  'use strict';

  angular.module('bottletrade.beers').factory("Beer",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Beer = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name and brewery
            this.search_name = this.name.toLowerCase();
            this.brewery = this.brewery.$id;
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Beer(firebaseRef(BTConstants.firebase.beers, id));
      };
    }
  );
})();
