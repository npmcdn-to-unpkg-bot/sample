'use strict';

var onDeviceReady = function(bootLocation) {

	console.log('deviceReady event received!');
	document.getElementById('appStatus').innerHTML =
		'deviceReady event received!';

	// Init all mobile components
	/////////////////////////////
	
	// PushNotification plugin
	var push = PushNotification.init({
        "android": {
            "senderID": "982083921915"
        }
    });
    
    push.on('registration', function(data) {
        console.log('registration event');
        document.getElementById('appStatus').innerHTML = 'Reg ID is: ' + data.registrationId;
        console.log(JSON.stringify(data));
    });

    push.on('notification', function(data) {
    	console.log('notification event');
        console.log(JSON.stringify(data));
        document.getElementById('appStatus').innerHTML =
        	'Received notification: ' + JSON.stringify(data);
        
        push.finish(function () {
            console.log('finish successfully called');
            document.getElementById('appStatus').innerHTML = 'Finished push plugin!';
        });
    });

    push.on('error', function(e) {
        console.log('push error');
        document.getElementById('appStatus').innerHTML = 'Error with push...';
    });

	// Bootstrap application to desired location
	console.log('Bootstrapping mobile app...');
	document.getElementById('appStatus').innerHTML =
		'Bootstrapping mobile app...';
	bootApp(bootLocation);
	console.log('Mobile app successfully bootstrapped!');
	document.getElementById('appStatus').innerHTML =
		'Mobile app successfully bootstrapped!';
};

var initMobileApp = function(bootLocation) {

	// Bind deviceReady event (when cordova is present, all is done after deviceReady event)
	console.log('Listening to deviceReady event...');
	document.getElementById('appStatus').innerHTML =
		'Listening to deviceReady event...';
	document.addEventListener('deviceready', function() {
		onDeviceReady(bootLocation);
	}, false);
};
