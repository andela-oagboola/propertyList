'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'propertylist';
	var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngFileUpload', 'uiGmapGoogleMapApi'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', 'uiGmapGoogleMapApiProvider',
	function($locationProvider, uiGmapGoogleMapApiProvider) {
		$locationProvider.hashPrefix('!');
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBfaxjCgRt9vPG21PhIJ_wcClgC1dTsWPA',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('properties');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('userProperites', {
			url: '/properties/users/:userId',
			templateUrl: 'modules/properties/views/userProperties.client.view.html',
			controller: 'UserProperties'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$location',
	function($scope, Authentication, Menus, $location) {
    // angular.element('.button-collapse').sideNav();
		$scope.authentication = Authentication;

		if ($scope.authentication.user.verification === 'pending') {
			return $location.path('/unverified-user');
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
'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
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
'use strict';
angular.module('properties').controller('addPropertiesCtrl', ['$scope', 'Authentication', '$upload', 'backendService', '$location', function($scope, Authentication, $upload, backendService, $location) {
  $scope.user = Authentication.user;
  $scope.properties = {};
  $scope.properties.email = $scope.user.email;

  if (!$scope.user) {
    return $location.path('/');
  }
  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.files = $files;
    }
  };

  $scope.createProperty = function () {
    $scope.loading = true;
    $scope.file = $scope.files[0];
    backendService.uploadImage($scope.file, 'POST', '/properties', $scope.properties).progress(function (evt) {
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
    }).success(function (data, status, headers, config) {
      $scope.property = data;
      var propertyId = data._id;
      alert('Property has been created');
      return $location.path('/properties/' + propertyId);
    });
  };

}]);

'use strict';
angular.module('properties').controller('ContactAgentCtrl', ['$location', '$scope', 'Authentication', 'backendService', '$stateParams', function($location, $scope, Authentication, backendService, $stateParams){

  $scope.authentication = Authentication;

  if(!$scope.authentication.user) {
    return $location.path('/');
  }

  $scope.user = Authentication.user;
  $scope.mailContent = {};

  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property;
  });
  $scope.sendMail = function () {
    $scope.loading = true;
    $scope.mailContent = {
      receiverEmail: $scope.property.email,
      senderEmail: $scope.user.email,
      senderName: $scope.user.displayName,
      subject: $scope.mailContent.subject,
      message: $scope.mailContent.message
    };
    backendService.contactAgent($stateParams.propertyId, $scope.mailContent).success(function (ee) {
      $scope.loading = false;
      alert('Email sent successfully');
      return $location.path('/properties');
    }).error(function(err) {
      alert('Error sending mail, please try again ', err);
    });
  };
}]);
'use strict';
angular.module('properties').controller('EditPropertyCtrl', ['Authentication', '$scope', 'backendService', '$stateParams', '$location', function(Authentication, $scope, backendService, $stateParams, $location){

  $scope.authentication = Authentication;
  
  if(!$scope.authentication.user) {
    return $location.path('/');
  }

  $scope.editImage = true;

  var getProperty = function () {
    backendService.getSingleProperty($stateParams.propertyId).success(function (res) {
      $scope.properties = res;
    });
  };
  getProperty();

  $scope.onFileSelect = function($files) {
    if ($files && $files.length > 0) {
      $scope.newFile = $files[0];
      $scope.fileName = $scope.newFile.name;
    }
  };

  $scope.edit_image = function () {
    $scope.editImage = false;
    $scope.allowEdit = true;
    $scope.isDisabled = true;
  };

  $scope.cancelEdit = function () {
    $scope.fileName = '';
    $scope.editImage = true;
    $scope.allowEdit = false;
    $scope.isDisabled = false;
  };

  $scope.update_Image = function () {
    var property = {image: $scope.fileName};
    var url = '/properties/' + $stateParams.propertyId;
    backendService.uploadImage($scope.newFile, 'PUT', url).progress(function (evt) {
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
    }).success(function (data, status, headers, config) {
      $scope.fileName = '';
      alert('image update successful');
      getProperty();
    }).error(function(err) {
      alert('error updating image:', err);
    });
  };

  $scope.updateProperty = function () {
    var url = '/properties/' + $stateParams.propertyId;
    backendService.editProperty($stateParams.propertyId, $scope.properties).success(function (response) {
      alert('update successful');
      $location.path('/properties/' + $stateParams.propertyId);
    }).error(function (err) {
      alert('error updating property:', err);
    });
  };
}]);
'use strict';

angular.module('properties').controller('PropertiesCtrl', ['$scope', 'backendService', function ($scope, backendService){
  backendService.getProperties().success(function(properties) {
    $scope.properties = properties;
  });
}]);
'use strict';
angular.module('properties').controller('UserProperties', ['Authentication', '$scope', 'backendService', '$location', function(Authentication, $scope, backendService, $location){
  $scope.user = Authentication.user;
  if (!$scope.user) {
    alert('you have to be logged in');
    $location.path('/');
  }
  backendService.getUserProperties($scope.user._id).success(function (response) {
    $scope.properties = response;
  });
}]);
'use strict';
angular.module('properties').controller('ViewPropertyCtrl', ['Authentication', '$scope', '$location', '$stateParams', 'backendService', 'uiGmapGoogleMapApi', function(Authentication, $scope, $location, $stateParams, backendService, uiGmapGoogleMapApi) {
  $scope.user = Authentication.user;
  backendService.getSingleProperty($stateParams.propertyId).success(function (property) {
    $scope.property = property;
    $scope.owner = $scope.property.posted_by._id;
  });


  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    };
  });
  $scope.deleteProperty = function () {
    var response = confirm('are you sure you want to delete this property?');
    if (response === true) {
      backendService.deleteProperty($stateParams.propertyId).success(function (result) {
        alert('property has been deleted');
        $location.path('/properties');
      }).error(function (err) {
        alert('err');
      });
    }
  };
}]);

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
    },

    contactAgent: function (propertyId, property) {
      return $http.post('/properties/' + propertyId + '/contactAgent', property);
    },

    getUserProperties: function (userId) {
      return $http.get('/properties/user/' + userId);
    }
  };
}]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		})
		.state('unverified-user', {
			url: '/unverified-user',
			templateUrl: 'modules/users/views/authentication/unverified-user.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// if($scope.authentication.user) {
		// 	return $location.path('/properties');
		// }
		
		var getProperties = function () {
			$http.get('/properties').success(function (res) {
				$scope.properties = res;
			});
		};
		getProperties();
		
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
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);