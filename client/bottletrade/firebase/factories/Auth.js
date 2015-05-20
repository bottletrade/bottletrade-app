(function() {
  'use strict';

  angular.module('bottletrade.firebase').factory("Auth", ["$firebaseAuth", "firebaseRef",
    function($firebaseAuth, firebaseRef) {
      return $firebaseAuth(firebaseRef());
    }
  ]);

})();
