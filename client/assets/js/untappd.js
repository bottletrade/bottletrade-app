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
  .factory('UntappdSearch',function($resource, UntappdConfig) {
    var baseUrl = UntappdConfig.ApiBaseUrl + '/search/beer?q=:query&' + 'client_id=:client_id&client_secret=:client_secret';
    return $resource(baseUrl, {
              client_id: UntappdConfig.ClientId,
              client_secret: UntappdConfig.ClientSecret,
              query: '@_query'
           }, {
             query: {
               method: 'GET',
               transformResponse: function (data) {
                 var jsonData = angular.fromJson(data);
                 return {
                   beers: jsonData.response.beers.items,
                   breweries: jsonData.response.breweries.items
                 };
               }
             }
           }
    );
  });
})();
