'use strict';
angular.module('properties').controller('addPropertiesCtrl', ['$scope', '$upload', 'backendService', '$location', function($scope, $upload, backendService, $location) {

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
    }).success(function (data, status, headers, config) {
      $scope.property = data;
      var propertyId = data._id;
      alert('Property has been created');
      return $location.path('/properties/' + propertyId);
    });
  };

}]);
