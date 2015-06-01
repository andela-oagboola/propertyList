'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//adding default user info for app testing
		$scope.credentials = {
			firstName: 'olaide',
			lastName: 'agboola',
			email: 'lydexmail@yahoo.com',
			username: 'lydex',
			password: 'olaide.agboola',
			phone_number: '123456766'
		};
		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the unverified user page
				$location.path('/unverified-user');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				if ($scope.authentication.user.verification === 'pending') {
					return $location.path('/unverified-user');
				}
				// And redirect to the all properties page
				$location.path('/properties');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);