'use strict';
angular.module('properties').controller('addPropertiesCtrl', ['$scope', 'backendService', function($scope, backendService) {

  $scope.onFileSelect = function($files) {
    $scope.files = $files;
    if ($files && $files.length > 0) {
      console.log($files, 'This is the file you just uploaded');
    }
  };

  $scope.addProperty = function() {
    if ($scope.files && $scope.files.length > 0) {
      console.log($scope.files, 'uploading imae part');
      backendService.uploadImage($scope.files).success(function (response) {
        console.log(response);
      })
      .error(function (error) {
        console.log(error);
      });
    }
  };

}]);
