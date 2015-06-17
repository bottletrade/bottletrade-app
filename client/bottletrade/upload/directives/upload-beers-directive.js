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
                brewery: result.correctBrewery.key()
              };

              BeerList.$add(beer).then(function(b) {
                result.correctBeer = b;
              });
            }
          }
        }

        function parseBeerResult(result) {
          result.matchedBreweries = {};
          result.matchedBeers = {};
          result.status = getStatus(result);

          if (result.brewery) {
            // check if brewery exists
            BreweryManager.searchByNameExact(result.brewery, function(key, brewery) {
              result.matchedBreweries[key] = brewery;
              result.status = getStatus(result);
            });
          }

          if (result.name) {
            // check if beer name exists
            BeerManager.searchByNameExact(result.name, function(key, beer) {
              result.matchedBeers[key] = beer;
              result.status = getStatus(result);
            });
          }

          scope.beers.push(result);
        }

        function getStatus(result) {
          if (totalMatchedBreweries(result) === 0) {
            return "ADD BREWERY";
          } else if (totalMatchedBreweries(result) > 1) {
            return "SELECT BREWERY";
          } else if (totalMatchedBeers(result) === 0) {
            return "ADD BEER";
          } else if (totalMatchedBeers(result) > 1) {
            return "SELECT BEER";
          } else if ((totalMatchedBreweries(result) === 1 && totalMatchedBeers(result) === 1) ||
              (totalMatchedBreweries(result) === 1 && result.correctBeer) ||
              (result.correctBrewery && totalMatchedBeers(result) === 1) ||
              (result.correctBrewery && result.correctBeer)) {
            return "MATCH";
          } else {
            return "ERROR";
          }
        }

        function totalMatchedBeers(result) {
          var obj = result.matchedBeers ? Object.keys(result.matchedBeers) : null;
          return obj ? obj.length : 0;
        }

        function totalMatchedBreweries(result) {
          var obj = result.matchedBreweries ? Object.keys(result.matchedBreweries) : null;
          return obj ? obj.length : 0;
        }
      }
    };
  });
})();
