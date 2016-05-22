'use strict';

// Global Variables
/*global $:false */

var InitApp = function() {

	// TODO init cross-platform app components

	// If cordova is present, initialize mobile app with all its components.
	// Otherwise - skip and go directly to web app bootstrapping
	if (window.cordova !== undefined) {

		console.log('Cordova found, initializing mobile app');
		document.getElementById('appStatus').innerHTML =
			'Cordova found, initializing mobile app';
		
		// Init mobile app and bootstrap to document body
		initMobileApp($('body'));

	} else {

		console.log('Cordova not found, initializing web app');
		document.getElementById('appStatus').innerHTML =
			'Cordova not found, skipping mobile app initialization';

		// Bootstrap application to document body
		bootApp($('body'));
		console.log('Web app successfully bootstrapped!');
		document.getElementById('appStatus').innerHTML =
			'Web app successfully bootstrapped!!';
	}
};

$(function() {

	// Initialize
	console.log('Initializing App!');
	document.getElementById('appStatus').innerHTML = 'Initializing App!';
	new InitApp();
});