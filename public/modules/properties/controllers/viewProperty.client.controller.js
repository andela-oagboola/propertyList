'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['Authentication', '$scope', '$location', '$stateParams', 'backendService', function(Authentication, $scope, $location, $stateParams, backendService) {
  $scope.user = Authentication.user;
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property;
    $scope.owner = $scope.property.posted_by._id;
  });

  $scope.deleteProperty = function () {
    var response = confirm('are you sure you want to delete this property?');
    if (response === true) {
      backendService.deleteProperty($stateParams.propertyId).success(function (result) {
        alert('property has been deleted');
        $location.path('/properties');
      }).error(function (err) {
        alert('err');
      });
    }
  };
}]);
