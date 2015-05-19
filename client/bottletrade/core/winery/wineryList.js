(function() {
  'use strict';

  angular.module('bottletrade').factory("WineryList",
    function($firebaseArray, firebaseRef, BTConstants) {
      // create a new service based on $firebaseArray
      var WineryList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          data.search_name = data.name.toLowerCase();
          return $firebaseArray.prototype.$add.call(this, data);
        }
      });

      return new WineryList(firebaseRef(BTConstants.firebase.wineries));
    }
  );
})();
