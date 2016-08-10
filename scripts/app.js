'use strict';

/**
 * @ngdoc overview
 * @name angularcordovaapp
 * @description
 * # angularcordovaapp
 *
 * Main module of the application.
 */

// Get the app name
var getAppName = function() {
	return 'angularcordovaapp';
};

// The app itself
var realApp = angular.module(getAppName(), appModules);
var app = angular.module(getAppName());

// Bootstrap the app to the desired location
var bootApp = function(location) {
	angular.bootstrap(location, [getAppName()]);
};