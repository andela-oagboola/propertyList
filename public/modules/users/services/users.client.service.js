'use strict';

// users service used for communicating with the users REST endpoint
angular.module('users').factory('users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);