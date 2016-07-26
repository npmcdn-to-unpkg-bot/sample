'use strict';

/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */

// Get the app name
var getAppName = function() {
	return 'angularAppApp';
};

// The app itself
var realApp = angular.module(getAppName(), appModules);
var app = angular.module(getAppName());

// Bootstrap the app to the desired location
var bootApp = function(location) {
	angular.bootstrap(location, [getAppName()]);
};