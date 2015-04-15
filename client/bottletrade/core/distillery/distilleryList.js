(function() {
  'use strict';

  angular.module('bottletrade').factory("DistilleryList",
    function($firebaseArray, firebaseRef) {
      return $firebaseArray(firebaseRef("distilleries"));
    }
  );
})();
