//require modules
var express = require('express');
//create express app
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var urlencodedParser = bodyParser.urlencoded( {extended: false});

// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/todolist';

//spin up server
app.listen( 3000, 'localhost', function(req, res) {
  console.log('server listening on port 3000');
});//end server

//set up static route for public folder
app.use(express.static('public'));

// base url
app.get( '/', function( req, res ){
  console.log( 'Ta Da! base url get' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

app.post( '/createNew', urlencodedParser, function( req, res ){
  var itemIn = req.body.task;
  pg.connect(connectionString, function(err, client, done){
    //client.query("INSERT INTO tasks (task, completed) VALUES ('"+ itemIn + "', false);");
    client.query('INSERT INTO tasks (task, completed) VALUES ( $1, $2)', [ itemIn, req.body.completed ] );
    done();
  });
  console.log("in createNew, and we have received: " + itemIn);
  res.end();
}); // end createNew

//   console.log( 'in POST createNew: ' + req.body.task + " " + req.body.active );
//
//   app.post('/sendItem', urlencodedparser, function(req, res){
//   var itemIn = req.body.todo;
//   pg.connect(connectionString, function(err, client, done){
//     client.query("INSERT INTO list (toDo, completed) VALUES ('"+ itemIn + "', false);");
//     done();
//   });
//   console.log("in sendItem, and we have received: " + itemIn);
//   res.end();
// });
  //pg.connect( connectionString, function( err, client, done ){
    // "users" is table. username = $1 = req.body.username
    //client.query( 'INSERT INTO users ( username, active, created ) VALUES ( $1, $2, $3)', [ req.body.username, req.body.active, 'now()' ] );
  //});
