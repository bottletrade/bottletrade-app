(function() {
  'use strict';

  angular.module('bottletrade').factory("BreweryList",
    function($firebaseArray, firebaseRef, BTConstants) {
      // create a new service based on $firebaseArray
      var BreweryList = $firebaseArray.$extend({
        "$add": function(data) {
          // before adding object, create lowercase
          // name property that can be used for search
          data.search_name = data.name.toLowerCase();
          return $firebaseArray.prototype.$add.call(this, data);
        }
      });

      return new BreweryList(firebaseRef(BTConstants.firebase.breweries));
    }
  );
})();
