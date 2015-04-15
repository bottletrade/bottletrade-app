(function() {
  'use strict';

  angular.module('bottletrade').factory("Distillery",
    function($firebaseObject, firebaseRef) {
      return function(id) {
        return $firebaseObject(firebaseRef("distilleries", id));
      };
    }
  );
})();
