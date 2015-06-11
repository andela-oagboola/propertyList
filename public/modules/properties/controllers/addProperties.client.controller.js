'use strict';
angular.module('properties').controller('addPropertiesCtrl', ['$scope', 'Authentication', '$upload', 'backendService', '$location', function($scope, Authentication, $upload, backendService, $location) {
  $scope.user = Authentication.user;
  $scope.properties = {};
  $scope.properties.email = $scope.user.email;

  if (!$scope.user) {
    return $location.path('/');
  }
  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.files = $files;
    }
  };

  $scope.createProperty = function () {
    $scope.file = $scope.files[0];
    backendService.uploadImage($scope.file, 'POST', '/properties', $scope.properties).progress(function (evt) {
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
    }).success(function (data, status, headers, config) {
      $scope.property = data;
      var propertyId = data._id;
      alert('Property has been created');
      return $location.path('/properties/' + propertyId);
    });
  };

}]);
