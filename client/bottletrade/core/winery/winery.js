(function() {
  'use strict';

  angular.module('bottletrade').factory("Winery",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("wineries", id));
      };
    }
  );
})();
