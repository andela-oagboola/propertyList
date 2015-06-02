'use strict';

angular.module('properties').factory('backendService', ['$http', function ($http) {
  return {
    getProperties: $http.get('/properties')
  };
}]);