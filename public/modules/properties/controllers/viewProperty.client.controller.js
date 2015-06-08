'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['$scope', '$location', '$stateParams', 'backendService', function($scope, $location, $stateParams, backendService) {
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property[0];
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
