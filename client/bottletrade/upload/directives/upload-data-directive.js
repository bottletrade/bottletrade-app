(function() {
  'use strict';

  angular.module('bottletrade.upload').directive('uploadData',
    function($q, $timeout, lodash, BreweryList, BeerList, BreweryManager, BeerManager,
             WineryList, WineList, WineryManager, WineManager,
             DistilleryList, SpiritList, DistilleryManager, SpiritManager) {
    return {
      replace: true,
      templateUrl: 'bottletrade/upload/directives/upload-data.html',
      scope: {
        fileData: '=',
        fileContents: '@',
        results: '='
      },
      link: function(scope, element) {
        var newCompanies = {};
        var newCompanyData = {};
        scope.uploadComplete = false;
        scope.uploadInProgress = false;
        scope.status = {
          addCompany: "",
          selectCompany: "",
          addBeverage: "",
          selectBeverage: "",
          match: "MATCH",
          error: "ERROR"
        };

        switch (scope.fileContents) {
          case 'beers':
          case 'breweries':
            scope.status.addCompany = "ADD BREWERY";
            scope.status.selectCompany = "SELECT BREWERY";
            scope.status.addBeverage = "ADD BEER";
            scope.status.selectBeverage = "SELECT BEER";
            break;
          case 'wines':
          case 'wineries':
            scope.status.addCompany = "ADD WINERY";
            scope.status.selectCompany = "SELECT WINERY";
            scope.status.addBeverage = "ADD WINE";
            scope.status.selectBeverage = "SELECT WINE";
            break;
          case 'spirits':
          case 'distilleries':
            scope.status.addCompany = "ADD DISTILLERY";
            scope.status.selectCompany = "SELECT DISTILLERY";
            scope.status.addBeverage = "ADD SPIRIT";
            scope.status.selectBeverage = "SELECT SPIRIT";
            break;
        }

        scope.fileData.forEach(function(result) {
          parseResult(result);
        });

        scope.save = function() {
          if (scope.uploadReady()) {
            scope.uploadInProgress = true;

            $timeout(function() {
              var companyPromises = [];
              // add all new companies
              Object.keys(newCompanies).forEach(function(companyName) {
                var company = {
                  name: companyName.toString(),
                  description: newCompanyData[companyName].description
                };

                switch (scope.fileContents) {
                  case 'beers':
                  case 'breweries':
                    companyPromises.push(BreweryList.$add(company).then(function(ref) {
                      company.$id = ref.key();
                      newCompanies[companyName] = company;
                    }));
                    break;
                  case 'wines':
                  case 'wineries':
                    companyPromises.push(WineryList.$add(company).then(function(ref) {
                      company.$id = ref.key();
                      newCompanies[companyName] = company;
                    }));
                    break;
                  case 'spirits':
                  case 'distilleries':
                    companyPromises.push(DistilleryList.$add(company).then(function(ref) {
                      company.$id = ref.key();
                      newCompanies[companyName] = company;
                    }));
                    break;
                }
              });

              $q.all(companyPromises).then(function() {
                var beveragePromises = [];
                scope.results.forEach(function(result) {
                  beveragePromises.push(addParsedResult(result));
                });

                $q.all(beveragePromises).then(function() {
                  scope.uploadComplete = true;
                }).finally(function() {
                  scope.uploadInProgress = false;
                });
              }).finally(function() {
                scope.uploadInProgress = false;
              });
            });
          }
        };

        scope.selectCompany = function(result) {
          result.matchedBeverages = {};
          result.status = getStatus(result);

          switch (scope.fileContents)
          {
            case 'beers':
              // check if beer name exists for brewery
              BeerManager.searchByNameExactFromBrewery(result.beverage, result.correctCompany.$id, function(key, beer) {
                result.matchedBeverages[key] = beer;
                result.status = getStatus(result);
              });
              break;
            case 'spirits':
              // check if spirit name exists for distillery
              SpiritManager.searchByNameExactFromBrewery(result.beverage, result.correctCompany.$id, function(key, spirit) {
                result.matchedBeverages[key] = spirit;
                result.status = getStatus(result);
              });
              break;
            case 'wines':
              // check if wine name exists for brewery
              WineManager.searchByNameExactFromBrewery(result.beverage, result.correctCompany.$id, function(key, wine) {
                result.matchedBeverages[key] = wine;
                result.status = getStatus(result);
              });
              break;
          }
        };

        scope.addCompany = function(companyName) {
          if (angular.isUndefined(newCompanies[companyName])) {
            newCompanies[companyName] = null;

            // find first result using company
            var firstCompany = lodash.first(scope.results, function(result) {
              return result.company === companyName;
            });
            if (angular.isUndefined(firstCompany)) {
              // no result matching company, invalid company was provided
              return;
            }

            newCompanyData[companyName] = {
              description: firstCompany.description
            };

            // mark brewery added for other results with same brewery
            scope.results.forEach(function(result) {
              if (result.status === scope.status.addCompany && result.company === companyName) {
                result.addedCompany = true;
                result.status = getStatus(result);
              }
            });
          }
        };

        scope.selectBeverage = function(result, beverage) {
          result.correctBeverage = beverage;
          result.status = getStatus(result);
        };

        scope.addBeverage = function(result) {
          result.addedBeverage = true;
          result.status = getStatus(result);
        };

        scope.uploadReady = function() {
          return !scope.uploadComplete && !scope.uploadInProgress && !lodash.find(scope.results, function(result) {
            return result.status !== scope.status.match;
          });
        };

        function addParsedResult(result) {
          var deferred = $q.defer();
          $timeout(function() {
            try {
              var beverage;

              // check if we need to assign the company
              if (result.addedCompany) {
                result.correctCompany = newCompanies[result.company];
              } else if (!result.correctCompany) {
                result.correctCompany = firstMatchedCompany(result);
              }

              // check if we need to add the beverage
              if (!result.addedBeverage || totalMatchedBeverages(result) > 0) {
                deferred.resolve();
              } else {
                switch (scope.fileContents)
                {
                  case 'beers':
                    beverage = {
                      name: result.beverage.toString(),
                      brewery: result.correctCompany.$id
                    };

                    BeerList.$add(beverage).then(function(bev) {
                      result.correctBeverage = bev;
                      deferred.resolve();
                    }, function() {
                      deferred.reject();
                    });
                    break;
                  case 'spirits':
                    beverage = {
                      name: result.beverage.toString(),
                      distillery: result.correctCompany.$id
                    };

                    SpiritList.$add(beverage).then(function(bev) {
                      result.correctBeverage = bev;
                      deferred.resolve();
                    }, function() {
                      deferred.reject();
                    });
                    break;
                  case 'wines':
                    beverage = {
                      name: result.beverage.toString(),
                      winery: result.correctCompany.$id
                    };

                    WineList.$add(beverage).then(function(bev) {
                      result.correctBeverage = bev;
                      deferred.resolve();
                    }, function() {
                      deferred.reject();
                    });
                    break;
                }
              }
            } catch (e) {
              deferred.reject();
            }
          });
          return deferred.promise;
        }

        function parseResult(result) {
          result.matchedCompanies = {};
          result.matchedBeverages = {};
          result.status = getStatus(result);

          if (result.company) {
            // check if company exists
            switch (scope.fileContents) {
              case 'beers':
              case 'breweries':
                BreweryManager.searchByNameExact(result.company, function(key, brewery) {
                  brewery.$id = key;
                  result.matchedCompanies[key] = brewery;
                  result.status = getStatus(result);
                });
                break;
              case 'wines':
              case 'wineries':
                WineryManager.searchByNameExact(result.company, function(key, winery) {
                  winery.$id = key;
                  result.matchedCompanies[key] = winery;
                  result.status = getStatus(result);
                });
                break;
              case 'spirits':
              case 'distilleries':
                DistilleryManager.searchByNameExact(result.company, function(key, distillery) {
                  distillery.$id = key;
                  result.matchedCompanies[key] = distillery;
                  result.status = getStatus(result);
                });
                break;
            }
          }

          if (result.beverage) {
            // check if beverage exists
            switch (scope.fileContents) {
              case 'beers':
                BeerManager.searchByNameExact(result.beverage, function(key, beer) {
                  beer.$id = key;
                  result.matchedBeverages[key] = beer;
                  result.status = getStatus(result);
                });
                break;
              case 'wines':
                WineManager.searchByNameExact(result.beverage, function(key, wine) {
                  wine.$id = key;
                  result.matchedBeverages[key] = wine;
                  result.status = getStatus(result);
                });
                break;
              case 'spirits':
                SpiritManager.searchByNameExact(result.beverage, function(key, spirit) {
                  spirit.$id = key;
                  result.matchedBeverages[key] = spirit;
                  result.status = getStatus(result);
                });
                break;
            }
          }

          scope.results.push(result);
        }

        function getStatus(result) {
          var companyMatched = false, beverageMatched = false;

          if (!result.addedCompany && totalMatchedCompanies(result) === 0) {
            return scope.status.addCompany;
          } else if (!result.correctCompany && totalMatchedCompanies(result) > 1) {
            return scope.status.selectCompany;
          }

          if (scope.fileContents == 'beers' || scope.fileContents == 'wines' || scope.fileContents == 'spirits') {
            if (!result.addedBeverage && totalMatchedBeverages(result) === 0) {
              return scope.status.addBeverage;
            } else if (!result.correctBeverage && totalMatchedBeverages(result) > 1) {
              return scope.status.selectBeverage;
            }
          }

          companyMatched = totalMatchedCompanies(result) === 1 || result.correctCompany || result.addedCompany;
          beverageMatched = totalMatchedBeverages(result) === 1 || result.correctBeverage || result.addedBeverage;

          if (scope.fileContents == 'beers' || scope.fileContents == 'wines' || scope.fileContents == 'spirits') {
            if (companyMatched && beverageMatched) {
              return scope.status.match;
            }
          } else {
            if (companyMatched) {
              return scope.status.match;
            }
          }

          return scope.status.error;
        }

        function totalMatchedBeverages(result) {
          var obj = result.matchedBeverages ? Object.keys(result.matchedBeverages) : null;
          return obj ? obj.length : 0;
        }

        function totalMatchedCompanies(result) {
          var obj = result.matchedCompanies ? Object.keys(result.matchedCompanies) : null;
          return obj ? obj.length : 0;
        }

        function firstMatchedCompany(result) {
          var keys = Object.keys(result.matchedCompanies);
          if (keys.length > 0) {
            return result.matchedCompanies[keys[0]];
          } else {
            return null;
          }
        }
      }
    };
  });
})();
