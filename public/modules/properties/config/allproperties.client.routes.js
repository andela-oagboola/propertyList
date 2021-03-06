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
   })
  .state('editProperties', {
    url: '/properties/:propertyId/edit',
    templateUrl: 'modules/properties/views/editProperty.client.view.html',
    controller: 'EditPropertyCtrl'
  })
  .state('contactAgent', {
    url: '/properties/:propertyId/contact-agent',
    templateUrl: 'modules/properties/views/contactAgent.client.view.html',
    controller: 'ContactAgentCtrl'
  });

}]);