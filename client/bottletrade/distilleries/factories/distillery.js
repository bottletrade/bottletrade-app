(function() {
  'use strict';

  angular.module('bottletrade.distilleries').factory("Distillery",
    function($firebaseObject, firebaseRef, BTConstants) {
      return function(id) {
        // create a new service based on $firebaseObject
        var Distillery = $firebaseObject.$extend({
          "$save": function() {
            // before saving object, update search name
            this.search_name = this.name.toLowerCase();
            return $firebaseObject.prototype.$save.call(this);
          }
        });

        return new Distillery(firebaseRef(BTConstants.firebase.distilleries, id));
      };
    }
  );
})();
