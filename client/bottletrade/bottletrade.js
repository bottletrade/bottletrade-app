(function() {
  'use strict';
  angular.module('bottletrade.common', []);
  angular.module('bottletrade.firebase', [
    'bottletrade.firebase.routeSecurity',
    'bottletrade.firebase.utils'
  ]);

  angular.module('bottletrade.beers', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.breweries', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.wines', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.wineries', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.spirits', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.distilleries', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.bottles', ['bottletrade.common', 'bottletrade.firebase']);
  angular.module('bottletrade.profile', ['bottletrade.common', 'bottletrade.firebase']);

  angular.module('bottletrade.autocomplete', [
    'bottletrade.common',
    'bottletrade.firebase',
    'bottletrade.beers',
    'bottletrade.breweries',
    'bottletrade.wines',
    'bottletrade.wineries',
    'bottletrade.spirits',
    'bottletrade.distilleries'
  ]);

  angular.module('bottletrade.search', [
    'bottletrade.common',
    'bottletrade.firebase',
    'bottletrade.beers',
    'bottletrade.breweries',
    'bottletrade.wines',
    'bottletrade.wineries',
    'bottletrade.spirits',
    'bottletrade.distilleries',
    'bottletrade.bottles'
  ]);

  angular.module('bottletrade.upload', [
    'bottletrade.common',
    'bottletrade.firebase',
    'bottletrade.beers',
    'bottletrade.breweries',
    'bottletrade.wines',
    'bottletrade.wineries',
    'bottletrade.spirits',
    'bottletrade.distilleries',
    'bottletrade.bottles',
    'bottletrade.search'
  ]);

  angular.module('bottletrade', [
    'bottletrade.beers',
    'bottletrade.bottles',
    'bottletrade.breweries',
    'bottletrade.common',
    'bottletrade.distilleries',
    'bottletrade.firebase',
    'bottletrade.profile',
    'bottletrade.search',
    'bottletrade.spirits',
    'bottletrade.upload',
    'bottletrade.wineries',
    'bottletrade.wines',
    'bottletrade.autocomplete'
  ]);
})();
