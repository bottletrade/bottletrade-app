(function() {
  'use strict';

  angular.module('bottletrade').directive('profile', function(Profile) {
    return {
      replace: true,
      templateUrl: '/bottletrade/profile/profile-directive/profile.html',
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
