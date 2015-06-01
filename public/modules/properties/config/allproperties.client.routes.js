'use strict';
angular.module('properties').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('allproperties', {
    url: '/properties',
    templateUrl: 'modules/properties/views/allproperties.client.view.html',
    controller: 'PropertiesCtrl'
  });
}]);