'use strict';

angular.module('properties').controller('PropertiesCtrl', ['$scope', 'backendService', function ($scope, backendService){
  backendService.getProperties.success(function(properties) {
    $scope.properties = properties;
  });
}]);