var gcm = require('node-gcm');
 
var message = new gcm.Message();
 
message.addData('Congrats!', 'Notification received!!');
 
var regTokens = ['dqay0L3K6Yg:APA91bFzMTJdrZVv-rsxEzn3IcVsLqWketcQWTqt7I4rLJvpqa5u8xf5sMp0OjDSS2EHXYU7vRvvn9TbBn4ANfdc-f7Wjgj-FAZ8BHmXRKycvWIMZVfMsngBa8oiU9SzcHxpAv2K8m8o'];
 
// Set up the sender with you API key 
var sender = new gcm.Sender('982083921915');
 
// Now the sender can be used to send messages 
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	if(err) console.error(err);
	else 	console.log(response);
});