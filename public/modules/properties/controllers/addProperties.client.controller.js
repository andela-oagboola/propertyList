'use strict';
angular.module('properties').controller('addPropertiesCtrl', ['$scope', '$upload', 'backendService', function($scope, $upload, backendService) {

  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.files = $files;
    }
  };

  $scope.addProperty = function() {
    $scope.file = $scope.files[0];
    $scope.upload = $upload.upload({
      url: '/properties',
      method: 'POST',
      data: $scope.properties,
      file: $scope.file
    }).progress(function (evt) {
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
    }).success(function (data, status, headers, config) {});
  };

}]);
