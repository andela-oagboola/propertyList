'use strict';

angular.module('properties').factory('backendService', ['$http', function ($http) {
  var cloud = {
    api_secret: 'k3K866jrhFt6D0ZzLHlIJOWhRu8',
    api_key: '128592429854141',
    cloud_name: 'drl4zlijn',
  };
  return {
    getProperties: function () {
      return $http.get('/properties');
    },

    add: function (propery) {
      return $http.post('/properties');
    },

    uploadImage: function (image) {
      return $http.post('/image/upload', image);
    }
  };
}]);