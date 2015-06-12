'use strict';
angular.module('properties').controller('UserProperties', ['Authentication', '$scope', 'backendService', function(Authentication, $scope, backendService){
  $scope.user = Authentication.user;
  backendService.getUserProperties($scope.user._id).success(function (response) {
    console.log(response);
    $scope.properties = response;
  });
}]);