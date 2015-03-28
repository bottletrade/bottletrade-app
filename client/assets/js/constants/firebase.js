(function() {
  'use strict';

  angular.module('application')
    .constant('FIREBASE_URL', 'https://amber-torch-76.firebaseio.com/')
    .constant('loginRedirectPath', '/account/login')
    .constant('FEED_SYNC_LIMIT', 5)
    .constant('authProviders', [
      { id: 'twitter',  name: 'Twitter',  icon: 'icon-twitter'  },
      { id: 'facebook', name: 'Facebook', icon: 'icon-facebook' },
      { id: 'email',    name: 'Email',    icon: 'icon-envelope' }
    ])
  ;
  
})();