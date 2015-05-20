(function() {
  'use strict';

  angular.module('bottletrade.wines').factory("Wine",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Wine = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Wine(firebaseRef(BTConstants.firebase.wines, id));
      };
    }
  );
})();
