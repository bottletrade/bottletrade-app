(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadBeers',
    function($timeout, BreweryList, BeerList, BreweryManager, BeerManager) {
    return {
      replace: true,
      templateUrl: '/bottletrade/upload/directives/upload-beers.html',
      scope: {
        fileData: '=',
        beers: '='
      },
      link: function(scope, element) {
        scope.fileData.forEach(function(result) {
          parseBeerResult(result);
        });

        scope.save = function() {
          scope.beers.forEach(function(result) {
            addParsedBeerResult(result);
          });
        };

        scope.totalMatchedBeers = function(result) {
          return Object.keys(result.matchedBeers).length;
        };

        scope.totalMatchedBreweries = function(result) {
          return Object.keys(result.matchedBreweries).length;
        };

        function addParsedBeerResult(result) {
          handleBrewery();

          function handleBrewery() {
            var brewery;

            // check if we need to add the brewery
            if (!result.addBrewery) {
              brewery = {
                name: result.brewery.toString()
              };

              BreweryList.$add(brewery).then(function(b) {
                result.correctBrewery = b;
                handleBeer();
              });
            } else {
              handleBeer();
            }
          }

          function handleBeer() {
            var beer;

            // check if we need to add the beer
            if (!result.addBeer) {
              beer = {
                name: result.name.toString(),
                brewery: result.correctBrewery
              };

              BeerList.$add(beer).then(function(b) {
                result.correctBeer = b;
              });
            }
          }
        }

        function parseBeerResult(result) {
          if (result.brewery) {
            // check if brewery exists
            $timeout(function() {
              BreweryManager.searchByNameExact(result.brewery, function(key, brewery) {
                // only create object once a result is returned
                if (!result.matchedBreweries) {
                  result.matchedBreweries = {};
                }
                result.matchedBreweries[key] = brewery;
              });
            });
          }

          if (result.name) {
            // check if beer name exists
            $timeout(function() {
              BeerManager.searchByNameExact(result.name, function(key, beer) {
                // only create object once a result is returned
                if (!result.matchedBeers) {
                  result.matchedBeers = {};
                }
                result.matchedBeers[key] = beer;
              });
            });
          }

          scope.beers.push(result);
        }
      }
    };
  });
})();
