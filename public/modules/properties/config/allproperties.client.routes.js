'use strict';
angular.module('properties').config(['$stateProvider', function ($stateProvider) {

  $stateProvider
  .state('allProperties', {
    url: '/properties',
    templateUrl: 'modules/properties/views/allproperties.client.view.html',
    controller: 'PropertiesCtrl'
  })
  .state('addProperties', {
    url: '/properties/add',
    templateUrl: 'modules/properties/views/addProperties.client.view.html',
    controller: 'addPropertiesCtrl'
  })
  .state('viewProperties', {
     url: '/properties/:propertyId',
     templateUrl: 'modules/properties/views/viewProperty.client.view.html',
     controller: 'ViewPropertyCtrl',
   });

}]);