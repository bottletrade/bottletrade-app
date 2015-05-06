(function() {
  'use strict';

  angular.module('application').controller("UploadCtrl",
    function ($scope, fileReader, spreadsheetParser) {
      $scope.progress = 0;
      $scope.parsedResults = [];
      $scope.fileContent = '';

      $scope.getFile = function () {
        fileReader.readAsText($scope.file, $scope)
          .then(function(result) {
            switch ($scope.fileContent) {
              case "breweries":
                $scope.parsedResults = spreadsheetParser.parseBreweryCsv(result);
                break;
              case "beers":
                $scope.parsedResults = spreadsheetParser.parseBeerCsv(result);
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
          $scope.fileContent = attrs.fileContent;
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        });
      }
    };
  });
})();
