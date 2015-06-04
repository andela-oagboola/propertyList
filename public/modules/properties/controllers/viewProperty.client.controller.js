'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['$scope', '$location', '$stateParams', 'backendService', function($scope, $location, $stateParams, backendService) {
  console.log($stateParams);
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    console.log(property);
    $scope.property = property[0];
  });
}]);
