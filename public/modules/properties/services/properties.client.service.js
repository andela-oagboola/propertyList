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

    editProperty: function (propertyId) {
      return $http.put('/properties/' + propertyId);
    },

    uploadImage: function (image, properties) {
      return $upload.upload({
        url: '/properties',
        method: 'POST',
        data: properties,
        file: image
      });
    }
  };
}]);
