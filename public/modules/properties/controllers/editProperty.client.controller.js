'use strict';
angular.module('properties').controller('EditPropertyCtrl', ['$scope', 'backendService', '$stateParams', function($scope, backendService, $stateParams){
  $scope.editImage = true;
  backendService.getSingleProperty($stateParams.propertyId).success(function (res) {
    // console.log(res);
    $scope.properties = res[0];
  });

  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.files = $files[0];
      $scope.fileName = $scope.files.name;
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
    console.log($scope.files);
  };

  $scope.updateProperty = function () { 
    console.log($scope.properties);
    // backendService.editProperty($stateParams.propertyId).success(function (response) {
    //   console.log('res', response);
    // }).error(function (err) {
    //   console.log('err', err);
    // });
  };
}]);