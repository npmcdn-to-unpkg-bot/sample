var express = require('express');
var qs = require('querystring');
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
  var body = '';

  req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
          req.connection.destroy();
  });

  req.on('end', function () {
      var post = qs.parse(body);
      var nameField = post.name,
      emailField = post.email,
      previewBool = post.previewAccess;
      signup(nameField, emailField, previewBool);
  });


  // var nameField = req.body.name,
  //     emailField = req.body.email,
  //     previewBool = req.body.previewAccess;
  // signup(nameField, emailField, previewBool);
  res.writeHead(200, {
    'Access-Control-Allow-Origin' : '*'
  });
  res.end();
  //res.status(200).end();
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