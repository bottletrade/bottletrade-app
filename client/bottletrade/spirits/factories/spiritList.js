(function() {
  'use strict';

  angular.module('bottletrade.spirits').factory("SpiritList",
    function($firebaseArray, firebaseRef, BTConstants) {
      // create a new service based on $firebaseArray
      var SpiritList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          data.search_name = data.name.toLowerCase();
          return $firebaseArray.prototype.$add.call(this, data);
        }
      });

      return new SpiritList(firebaseRef(BTConstants.firebase.spirits));
    }
  );
})();
