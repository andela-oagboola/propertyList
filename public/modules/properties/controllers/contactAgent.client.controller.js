'use strict';
angular.module('properties').controller('ContactAgentCtrl', ['$location', '$scope', 'Authentication', 'backendService', '$stateParams', function($location, $scope, Authentication, backendService, $stateParams){

  $scope.authentication = Authentication;

  if(!$scope.authentication.user) {
    return $location.path('/');
  }

  $scope.user = Authentication.user;
  $scope.mailContent = {};

  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property[0];
  });
  $scope.sendMail = function () {
    $scope.mailContent = {
      receiverEmail: $scope.property.email,
      senderEmail: $scope.user.email,
      senderName: $scope.user.displayName,
      subject: $scope.mailContent.subject,
      message: $scope.mailContent.message
    };
    backendService.contactAgent($stateParams.propertyId, $scope.mailContent).success(function (ee) {
      console.log(ee);
      alert('done');
    });
  };
}]);