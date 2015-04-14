(function() {
  'use strict';

  angular.module('bottletrade').factory("BTService", function() {
    var beers = [], breweries = [];
    var beerId = 1, breweryId = 1;

    return {
      addBeer: addBeer,
      getBeers: getBeers,
      addBrewery: addBrewery,
      getBreweries: getBreweries
    };

    function addBeer(beer) {
      beer.id = beerId;
      beerId++;
      beers.push(beer);
    }

    function getBeers() {
      return beers;
    }

    function addBrewery(brewery) {
      brewery.id = breweryId;
      breweryId++;
      breweries.push(brewery);
    }

    function getBreweries() {
      return breweries;
    }
  });

})();
