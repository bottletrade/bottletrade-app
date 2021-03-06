(function() {
  'use strict';

  angular.module('application').controller("UploadCtrl",
    function ($scope, $timeout, $state, $stateParams, fileReader, spreadsheetParser,
              BeerList, BeerManager, BreweryList, BreweryManager,
              WineList, WineManager, WineryList, WineryManager,
              SpiritList, SpiritManager, DistilleryList, DistilleryManager) {
      $scope.parsedResults = [];
      $scope.fileResults = [];
      $scope.fileContents = '';
      $scope.fileData = '';
      $scope.file = null;

      $scope.$watch('fileContents', function(newVal) {
        if (newVal) {
          $state.go('.', { type: newVal }, { notify: false });
        }
      });

      $scope.clickFileInput = function() {
        $timeout(function() {
          document.getElementById('spreadsheetFileUpload').click();
        });
      };

      $scope.upload = function () {
        fileReader.readAsText($scope.file, $scope)
          .then(function(data) {
            $scope.fileResults.splice(0, $scope.fileResults.length);
            $scope.parsedResults.splice(0, $scope.parsedResults.length);

            // parse results
            switch ($scope.fileContents) {
              case "beers":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseBeerCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseBeerTsv(data);
                }
                break;
              case "breweries":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseBreweryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseBreweryTsv(data);
                }
                break;
              case "wines":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseWineCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseWineTsv(data);
                }
                break;
              case "wineries":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseWineryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseWineryTsv(data);
                }
                break;
              case "spirits":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseWineCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseWineTsv(data);
                }
                break;
              case "distilleries":
                if ($scope.file.name.endsWith(".csv")) {
                  $scope.fileResults = spreadsheetParser.parseDistilleryCsv(data);
                } else if ($scope.file.name.endsWith(".tsv")) {
                  $scope.fileResults = spreadsheetParser.parseDistilleryTsv(data);
                }
                break;
            }
          });
      };

      $timeout(function() {
        if ($stateParams.type) {
          $scope.fileContents = $stateParams.type;
        }
      });
    }
  );

  angular.module('application').directive("ngFileSelect",function($timeout){
    return {
      link: function($scope, elem, attrs){
        elem.bind("change", function(e){
          $timeout(function() {
            $scope.file = (e.srcElement || e.target).files[0];
            $scope.upload();
          });
        });
      }
    };
  });
})();
