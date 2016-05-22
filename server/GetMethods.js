// GetMethods.js

var path = require('path');

var getIndex = function (req, res) {
  res.sendFile(path.resolve(__dirname, '../', 'index.html' ));
};

var getCordova = function (req, res) {
  res.sendFile(path.resolve(__dirname, '../', 'cordova.js' ));
};

var getAll = function (req, res, regEx) {
  res.sendFile(path.resolve(__dirname, '../', regEx ));
};

var getProcess = function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
};

module.exports = {

	getIndex: getIndex,

  getCordova: getCordova,

  getAll: getAll,

	getProcess: getProcess

};