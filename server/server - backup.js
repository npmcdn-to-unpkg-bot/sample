var express = require('express');
var parser = require('body-parser');
var path = require('path');
var AWS = require('aws-sdk');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(parser.json());
app.use(parser.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '..')));

var GetMethods = require('./GetMethods.js');

app.get('/', GetMethods.getIndex);

app.get('/index.html', GetMethods.getIndex);

//Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: "us-west-2"});

//POST signup form.
app.post('/signup', function(req, res) {
  var nameField = req.body.name,
      emailField = req.body.email,
      previewBool = req.body.previewAccess;
  signup(nameField, emailField, previewBool);
  res.writeHead(200, {
    'Access-Control-Allow-Origin' : '*'
  });
  res.end();
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