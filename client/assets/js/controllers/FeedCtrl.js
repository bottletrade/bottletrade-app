(function() {
  'use strict';

  angular.module('application').controller("FeedCtrl", ["currentAuth", function(currentAuth) {
    // currentAuth (provided by resolve) will contain the
    // authenticated user or null if not logged in
  }]);
  
})();