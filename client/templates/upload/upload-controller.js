(function() {
  'use strict';

  angular.module('application').controller("UploadCtrl",
    function ($scope, $timeout, fileReader, spreadsheetParser,
              BeerList, BeerManager, BreweryList, BreweryManager,
              WineList, WineManager, WineryList, WineryManager,
              SpiritList, SpiritManager, DistilleryList, DistilleryManager) {
      $scope.progress = 0;
      $scope.parsedResults = [];
      $scope.fileContents = '';
      $scope.fileData = '';

      $scope.upload = function () {
        fileReader.readAsText($scope.file, $scope)
          .then(function(data) {
            var results = [];
            $scope.parsedResults.splice(0, $scope.parsedResults.length);

            // parse results
            switch ($scope.fileContents) {
              case "beers":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseBeerCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseBeerTsv(data);
                }
                break;
              case "breweries":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseBreweryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseBreweryTsv(data);
                }
                break;
              case "wines":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseWineCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseWineTsv(data);
                }
                break;
              case "wineries":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseWineryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseWineryTsv(data);
                }
                break;
              case "spirits":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseWineCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseWineTsv(data);
                }
                break;
              case "distilleries":
                if ($scope.file.name.endsWith(".csv")) {
                  results = spreadsheetParser.parseDistilleryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  results = spreadsheetParser.parseDistilleryTsv(data);
                }
                break;
            }

            // check for existing data
            switch ($scope.fileContents) {
              case "beers":
                results.forEach(function(result) {
                  parseBeerResult(result);
                });
                break;
              case "breweries":
                results.forEach(function(result) {
                  parseBreweryResult(result);
                });
                break;
              case "wines":
                results.forEach(function(result) {
                  parseWineResult(result);
                });
                break;
              case "wineries":
                results.forEach(function(result) {
                  parseWineryResult(result);
                });
                break;
              case "spirits":
                results.forEach(function(result) {
                  parseSpiritResult(result);
                });
                break;
              case "distilleries":
                results.forEach(function(result) {
                  parseDistilleryResult(result);
                });
                break;
            }
          });

          function parseBreweryResult(result) {
            if (result.name) {
              // check if brewery name exists
              $timeout(function() {
                BreweryManager.searchByNameExact(result.name, function(key, brewery) {
                  // only create object once a result is returned
                  if (!result.matchedBreweries) {
                    result.matchedBreweries = {};
                  }
                  result.matchedBreweries[key] = brewery;
                });
              });
            }

            $scope.parsedResults.push(result);
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

            $scope.parsedResults.push(result);
          }

          function parseWineryResult(result) {
            if (result.name) {
              // check if winery name exists
              $timeout(function() {
                WineryManager.searchByNameExact(result.name, function(key, winery) {
                  // only create object once a result is returned
                  if (!result.matchedWineries) {
                    result.matchedWineries = {};
                  }
                  result.matchedWineries[key] = winery;
                });
              });
            }

            $scope.parsedResults.push(result);
          }

          function parseWineResult(result) {
            if (result.winery) {
              // check if winery exists
              $timeout(function() {
                WineryManager.searchByNameExact(result.winery, function(key, winery) {
                  // only create object once a result is returned
                  if (!result.matchedWineries) {
                    result.matchedWineries = {};
                  }
                  result.matchedWineries[key] = winery;
                });
              });
            }

            if (result.name) {
              // check if wine name exists
              $timeout(function() {
                WineManager.searchByNameExact(result.name, function(key, wine) {
                  // only create object once a result is returned
                  if (!result.matchedWines) {
                    result.matchedWines = {};
                  }
                  result.matchedWines[key] = wine;
                });
              });
            }

            $scope.parsedResults.push(result);
          }

          function parseDistilleryResult(result) {
            if (result.name) {
              // check if distillery name exists
              $timeout(function() {
                DistilleryManager.searchByNameExact(result.name, function(key, distillery) {
                  // only create object once a result is returned
                  if (!result.matchedDistilleries) {
                    result.matchedDistilleries = {};
                  }
                  result.matchedDistilleries[key] = distillery;
                });
              });
            }

            $scope.parsedResults.push(result);
          }

          function parseSpiritResult(result) {
            if (result.distillery) {
              // check if distillery exists
              $timeout(function() {
                WineryManager.searchByNameExact(result.distillery, function(key, distillery) {
                  // only create object once a result is returned
                  if (!result.matchedDistilleries) {
                    result.matchedDistilleries = {};
                  }
                  result.matchedDistilleries[key] = distillery;
                });
              });
            }

            if (result.name) {
              // check if spirit name exists
              $timeout(function() {
                SpiritManager.searchByNameExact(result.name, function(key, spirit) {
                  // only create object once a result is returned
                  if (!result.matchedSpirits) {
                    result.matchedSpirits = {};
                  }
                  result.matchedSpirits[key] = spirit;
                });
              });
            }

            $scope.parsedResults.push(result);
          }
      };

      $scope.save = function() {
        switch ($scope.fileContents) {
          case "beers":
            $scope.parsedResults.forEach(function(result) {
              addParsedBeerResult(result);
            });
            break;
          case "breweries":
            $scope.parsedResults.forEach(function(result) {
              addParsedBreweryResult(result);
            });
            break;
          case "wines":
            $scope.parsedResults.forEach(function(result) {
              addParsedWineResult(result);
            });
            break;
          case "wineries":
            $scope.parsedResults.forEach(function(result) {
              addParsedWineryResult(result);
            });
            break;
          case "spirits":
            $scope.parsedResults.forEach(function(result) {
              addParsedSpiritResult(result);
            });
            break;
          case "distilleries":
            $scope.parsedResults.forEach(function(result) {
              addParsedDistilleryResult(result);
            });
            break;
        }

        function addParsedBeerResult(result) {
          var beer, brewery;

          // check if we need to add the brewery
          if (!result.matchedBreweries) {
            brewery = {
              name: result.brewery.toString()
            };

            BreweryList.$add(brewery).then(function(b) {
              result.breweryExists = true;
            });
          }

          // check if we need to add the beer
          if (!result.matchedBeers) {
            beer = {
              name: result.name.toString()
            };

            BeerList.$add(beer).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function addParsedBreweryResult(result) {
          var brewery;

          // check if we need to add the brewery
          if (!result.matchedBreweries) {
            brewery = {
              name: result.name.toString()
            };

            BreweryList.$add(brewery).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function addParsedWineResult(result) {
          var wine, winery;

          // check if we need to add the winery
          if (!result.matchedWineries) {
            winery = {
              name: result.winery.toString()
            };

            WineryList.$add(winery).then(function(b) {
              result.wineryExists = true;
            });
          }

          // check if we need to add the wine
          if (!result.matchedWines) {
            wine = {
              name: result.name.toString()
            };

            WineList.$add(wine).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function addParsedWineryResult(result) {
          var winery;

          // check if we need to add the winery
          if (!result.matchedWineries) {
            winery = {
              name: result.name.toString()
            };

            WineryList.$add(winery).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function addParsedSpiritResult(result) {
          var spirit, distillery;

          // check if we need to add the distillery
          if (!result.matchedDistilleries) {
            distillery = {
              name: result.distillery.toString()
            };

            DistilleryList.$add(distillery).then(function(b) {
              result.distilleryExists = true;
            });
          }

          // check if we need to add the spirit
          if (!result.matchedSpirits) {
            spirit = {
              name: result.name.toString()
            };

            SpiritList.$add(spirit).then(function(b) {
              result.nameExists = true;
            });
          }
        }

        function addParsedDistilleryResult(result) {
          var distillery;

          // check if we need to add the distillery
          if (!result.matchedDistilleries) {
            distillery = {
              name: result.name.toString()
            };

            DistilleryList.$add(distillery).then(function(b) {
              result.nameExists = true;
            });
          }
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
