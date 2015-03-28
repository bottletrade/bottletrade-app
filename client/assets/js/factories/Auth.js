(function() {
  'use strict';

  angular.module('application').factory("Auth", ["$firebaseAuth", "firebaseRef", 
    function($firebaseAuth, firebaseRef) {
      return $firebaseAuth(firebaseRef());
    }
  ]);
  
})();