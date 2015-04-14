(function() {
  'use strict';

  angular.module('bottletrade')
    .constant('BTConstants', {
      beverages: {
        beer: "beer",
        wine: "wine",
        spirit: "spirit"
      },
      companies: {
        brewery: "brewery",
        winery: "winery",
        distillery: "distillery"
      }
    })
  ;

})();
