'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$location',
	function($scope, Authentication, Menus, $location) {
    // angular.element('.button-collapse').sideNav();
		$scope.authentication = Authentication;

		if ($scope.authentication.user.verification === 'pending') {
			return $location.path('/unverified-user');
		}

		if($scope.authentication.user) {
			return $location.path('/properties');
		}

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);