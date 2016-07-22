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
var app = angular.module(getAppName(), appModules);

// Bootstrap the app to the desired location
var bootApp = function(location) {
	angular.bootstrap(location, [getAppName()]);
};