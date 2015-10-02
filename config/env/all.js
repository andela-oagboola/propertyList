'use strict';

module.exports = {
	app: {
		title: 'QuickSale',
		description: 'An app for listing properties for sale to attract buyers',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/materialize/dist/css/materialize.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/materialize/dist/js/materialize.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
				'public/lib/ng-file-upload/angular-file-upload.min.js',
				'public/lib/lodash/lodash.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};