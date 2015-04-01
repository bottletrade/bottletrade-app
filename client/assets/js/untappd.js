(function() {
  'use strict';

  angular.module('untappd', ['ngResource'])
  .constant('UntappdConfig', {
    ClientId: "",
    ClientSecret: "",
    BaseUrl: 'https://untappd.com',
    ApiBaseUrl: 'https://api.untappd.com/v4',
    LogoutUrl: 'https://untappd.com/logout',
    RedirectUrl: 'http://localhost:8080'
  })
  .factory('UntappdBeer',function($resource, UntappdConfig) {
    var baseUrl = UntappdConfig.ApiBaseUrl + '/beer/info/:id' + '?client_id=:client_id&client_secret=:client_secret';
    return $resource(baseUrl, {
              client_id: UntappdConfig.ClientId,
              client_secret: UntappdConfig.ClientSecret,
              id: '@_id'
    });
  })
  .factory('UntappdBeerSearch',function($resource, UntappdConfig) {
    var baseUrl = UntappdConfig.ApiBaseUrl + '/search/beer?q=:search&' + 'client_id=:client_id&client_secret=:client_secret';
    return $resource(baseUrl, {
              client_id: UntappdConfig.ClientId,
              client_secret: UntappdConfig.ClientSecret,
              search: '@_search'
           }, {
             query: {
               method: 'GET',
               isArray: true,
               transformResponse: function (data) {
                 return angular.fromJson(data).response.beers.items;
               }
             }
           }
    );
  })
  .factory('UntappdBrewerySearch',function($resource, UntappdConfig) {
    var baseUrl = UntappdConfig.ApiBaseUrl + '/search/brewery?q=:search&' + 'client_id=:client_id&client_secret=:client_secret';
    return $resource(baseUrl, {
              client_id: UntappdConfig.ClientId,
              client_secret: UntappdConfig.ClientSecret,
              search: '@_search'
           }, {
             query: {
               method: 'GET',
               isArray: true,
               transformResponse: function (data) {
                 return angular.fromJson(data).response.brewery.items;
               }
             }
           }
    );
  });
})();
