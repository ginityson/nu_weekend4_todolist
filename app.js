//require modules
var express = require('express');
//create express app
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var urlencodedParser = bodyParser.urlencoded( {extended: false});

//spin up server
app.listen( 3000, 'localhost', function(req, res) {
  console.log('server listening on port 3000');
});//end server
