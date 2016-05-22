var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname));

var GetMethods = require('./server/GetMethods.js');

app.get('/', GetMethods.getIndex);

app.get('/index.html', GetMethods.getIndex);

//app.get('/process_get', GetMethods.getProcess);

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

});