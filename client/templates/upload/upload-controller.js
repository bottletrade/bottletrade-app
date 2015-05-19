(function() {
  'use strict';

  angular.module('application').controller("UploadCtrl",
    function ($scope, $timeout, BeerList, BeerManager, BreweryList, BreweryManager, fileReader, spreadsheetParser) {
      $scope.progress = 0;
      $scope.parsedResults = [];
      $scope.fileContents = '';
      $scope.fileData = '';

      $scope.upload = function () {
        fileReader.readAsText($scope.file, $scope)
          .then(function(data) {
            var results = [];

            // parse results
            switch ($scope.fileContents) {
              case "breweries":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseBreweryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseBreweryTsv(data);
                }
                break;
              case "beers":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseBeerCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseBeerTsv(data);
                }
                break;
            }

            // check for existing data
            switch ($scope.fileContents) {
              case "breweries":
                results.forEach(function(result) {
                  if (result.name) {
                    // check if brewery name exists
                    $timeout(function() {
                      BreweryManager.searchByNameExact(result.name).then(function(key, brewery) {
                        // only create object once a result is returned
                        if (!result.matchedBreweries) {
                          result.matchedBreweries = {};
                        }
                        result.matchedBreweries[key] = brewery;
                      });
                    });
                  }
                });
                break;
              case "beers":
                results.forEach(function(result) {
                  if (result.brewery) {
                    // check if brewery exists
                    $timeout(function() {
                      BreweryManager.searchByNameExact(result.brewery).then(function(key, brewery) {
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
                      BeerManager.searchByNameExact(result.name).then(function(key, beer) {
                        // only create object once a result is returned
                        if (!result.matchedBeers) {
                          result.matchedBeers = {};
                        }
                        result.matchedBeers[key] = beer;
                      });
                    });
                  }
                });
                break;
            }

            $scope.parsedResults = results;
          });
      };

      $scope.save = function() {
        switch ($scope.fileContents) {
          case "beers":
            $scope.parsedResults.forEach(function(result) {
              var beer, brewery;

              // check if we need to add the brewery
              if (!result.breweryExists) {
                brewery = {
                  name: result.brewery.toString()
                };

                BreweryList.$add(brewery).then(function(b) {
                  result.breweryExists = true;
                });
              }

              // check if we need to add the beer
              if (!result.nameExists) {
                beer = {
                  name: result.name.toString()
                };

                BeerList.$add(beer).then(function(b) {
                  result.nameExists = true;
                });
              }
            });
            break;
          case "breweries":
            $scope.parsedResults.forEach(function(result) {
              var brewery;

              // check if we need to add the brewery
              if (!result.nameExists) {
                brewery = {
                  name: result.name.toString()
                };

                BreweryList.$add(brewery).then(function(b) {
                  result.nameExists = true;
                });
              }
            });
            break;
        }
      };

      $scope.$on("fileProgress", function(e, progress) {
          $scope.progress = progress.loaded / progress.total;
      });
    }
  );

  angular.module('application').directive("ngFileSelect",function(){
    return {
      link: function($scope, elem, attrs){
        elem.bind("change", function(e){
          $scope.file = (e.srcElement || e.target).files[0];
        });
      }
    };
  });
})();
