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
      },
      firebase: {
        bottles: "bottles",
        beers: "beers",
        wines: "wines",
        spirits: "spirits",
        breweries: "breweries",
        wineries: "wineries",
        distilleries: "distilleries"
      }
    })
  ;

})();
