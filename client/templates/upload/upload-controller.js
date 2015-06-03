(function() {
  'use strict';

  angular.module('application').controller("UploadCtrl",
    function ($scope, $timeout, fileReader, spreadsheetParser,
              BeerList, BeerManager, BreweryList, BreweryManager,
              WineList, WineManager, WineryList, WineryManager,
              SpiritList, SpiritManager, DistilleryList, DistilleryManager) {
      $scope.progress = 0;
      $scope.parsedResults = [];
      $scope.fileResults = [];
      $scope.fileContents = '';
      $scope.fileData = '';

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
