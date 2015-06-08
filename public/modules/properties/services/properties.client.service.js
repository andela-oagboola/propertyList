'use strict';

angular.module('properties').factory('backendService', ['$http', '$upload', function ($http, $upload) {
  return {
    getProperties: function () {
      return $http.get('/properties');
    },

    addProperty: function (property) {
      return $http.post('/properties', property);
    },

    getSingleProperty: function (propertyId) {
      return $http.get('/properties/' + propertyId);
    },

    deleteProperty: function (propertyId) {
      return $http.delete('/properties/' + propertyId);
    },

    editProperty: function (propertyId, properties) {
      return $http.put('/properties/' + propertyId, properties);
    },

    uploadImage: function (image, method, url, properties) {
      return $upload.upload({
        url: url,
        method: method,
        data: properties,
        file: image
      });
    }
  };
}]);
