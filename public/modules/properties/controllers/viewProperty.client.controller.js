'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['$scope', '$location', '$stateParams', 'backendService', function($scope, $location, $stateParams, backendService) {
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property[0];
  });
}]);
