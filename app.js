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

// send back all records in users that conform to the query
app.get( '/getUsers', function( req, res ){
  console.log( 'in get users' );
// this wil hold our results
  var results =[];
  pg.connect( connectionString, function( err, client, done ){
    // get all user records and store in "query" variable
    var query = client.query( 'SELECT * FROM users WHERE active=true ORDER BY id DESC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      return res.json( results );
    });
  }); // end connect
});
// // send back all records in users that conform to the query
// app.get( '/getUsers', function( req, res ){
//   console.log( 'in get users' );
// // this wil hold our results
//   var results =[];
//   pg.connect( connectionString, function( err, client, done ){
//     // get all user records and store in "query" variable
//     var query = client.query( 'SELECT * FROM users WHERE active=true ORDER BY id DESC;' );
//     console.log( "query: " + query );
//     // push each row in query into our results array
//     var rows = 0;
//     query.on( 'row', function ( row ){
//       results.push( row );
//     }); // end query push
//     query.on( 'end', function (){
//       return res.json( results );
//     });
//   }); // end connect
// });
