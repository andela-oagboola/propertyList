'use strict';
angular.module('properties').controller('EditPropertyCtrl', ['$scope', 'backendService', '$stateParams', '$location', function($scope, backendService, $stateParams, $location){
  $scope.editImage = true;

  var getProperty = function () {
    backendService.getSingleProperty($stateParams.propertyId).success(function (res) {
      $scope.properties = res[0];
    });
  };
  getProperty();

  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.newFile = $files[0];
      $scope.fileName = $scope.newFile.name;
    }
  };

  $scope.edit_image = function () {
    $scope.editImage = false;
    $scope.allowEdit = true;
    $scope.isDisabled = true;
  };

  $scope.cancelEdit = function () {
    $scope.fileName = '';
    $scope.editImage = true;
    $scope.allowEdit = false;
    $scope.isDisabled = false;
  };

  $scope.updateImage = function () {
    var property = {image: $scope.fileName};
    var url = '/properties/' + $stateParams.propertyId;
    backendService.uploadImage($scope.newFile, 'PUT', url).progress(function (evt) {
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
    }).success(function (data, status, headers, config) {
      $scope.fileName = '';
      getProperty();
      alert('image update successful');
    });
  };

  $scope.updateProperty = function () {
    var url = '/properties/' + $stateParams.propertyId;
    backendService.editProperty($stateParams.propertyId, $scope.properties).success(function (response) {
      alert('update successful');
      $location.path('/properties/' + $stateParams.propertyId);
    }).error(function (err) {
      console.log('err', err);
    });
  };
}]);