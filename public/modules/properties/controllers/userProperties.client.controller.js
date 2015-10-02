'use strict';
angular.module('properties').controller('UserProperties', ['Authentication', '$scope', 'backendService', '$location', function(Authentication, $scope, backendService, $location){
  $scope.user = Authentication.user;
  if (!$scope.user) {
    alert('you have to be logged in');
    $location.path('/');
  }
  backendService.getUserProperties($scope.user._id).success(function (response) {
    $scope.properties = response;
  });
}]);