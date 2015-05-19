(function() {
  'use strict';

  angular.module('bottletrade').factory("DistilleryList",
    function($firebaseArray, firebaseRef, BTConstants) {
      // create a new service based on $firebaseArray
      var DistilleryList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          data.search_name = data.name.toLowerCase();
          return $firebaseArray.prototype.$add.call(this, data);
        }
      });

      return new DistilleryList(firebaseRef(BTConstants.firebase.distilleries));
    }
  );
})();
