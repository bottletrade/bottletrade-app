(function() {
  'use strict';

  angular.module('bottletrade').factory("SearchService",
    function() {
      var config = {
        query: ""
      };

      return {
        setQuery: setQuery,
        getConfig: getConfig
      };

      function setQuery(q) {
        config.query = q;
      }

      function getConfig() {
        return config;
      }
    }
  );
})();
