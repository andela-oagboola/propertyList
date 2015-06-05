'use strict';

angular.module('properties').factory('backendService', ['$http', function ($http) {
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
    }
  };
}]);
