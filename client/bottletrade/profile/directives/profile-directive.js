(function() {
  'use strict';

  angular.module('bottletrade.profile').directive('profile', function(Profile) {
    return {
      replace: true,
      templateUrl: '/bottletrade/profile/directives/profile.html',
      scope: {
        username: '='
      },
      link: function(scope, element) {
        scope.profile = new Profile(username);

        // calling $save() on the synchronized object syncs all data back to Firebase
        scope.saveProfile = function() {
          $scope.profile.$save().then(function() {
            alert('Profile saved to Firebase!');
          }).catch(function(error) {
            alert('Error!');
          });
        };
      }
    };
  });
})();
