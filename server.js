var express = require('express');
var AWS = require('aws-sdk');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname));

var GetMethods = require('./server/GetMethods.js');

app.get('/', GetMethods.getIndex);

app.get('/index.html', GetMethods.getIndex);

//Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: "us-west-2"});

//POST signup form.
app.post('/signup', function(req, res) {
  var nameField = req.name,
      emailField = req.email,
      previewBool = req.previewAccess;
  signup(nameField, emailField, previewBool);
  res.status(200).end();
});

var signup = function (nameSubmitted, emailSubmitted, previewPreference) {
  var formData = {
    TableName: "SampleDB",
    Item: {
      email: {'S': emailSubmitted}, 
      name: {'S': nameSubmitted},
      preview: {'S': previewPreference}
    }
  };
  db.putItem(formData, function(err, data) {
    if (err) {
      console.log('Error adding item to database: ', err);
    } else {
      console.log('Form data added to database.');  
    }
  });
};

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

});