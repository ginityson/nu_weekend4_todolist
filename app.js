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
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO tasks (task, completed) VALUES ( $1, $2)', [ req.body.task, req.body.completed ] );
  res.send()
  });//end pg connect
  console.log("in createNew, and we have received: " + req.body.task);
  res.end();
  done();
}); // end createNew

app.post('/deleteTask', urlencodedParser, function(req, res){
  console.log("delete this task: " + req.body.id);
  pg.connect(connectionString, function(err, client, done){
    client.query("DELETE FROM tasks WHERE id=" + req.body.id);
    done();
  });//end pg connect
  res.end();
});//end deleteTask


// send back all records in tasks that conform to the query
app.get( '/getTasks', function( req, res ){
  console.log( 'in get tasks' );
// this will hold our results
  var results =[];

  pg.connect( connectionString, function( err, client, done ){
    // get all user records and store in "query" variable
    var query = client.query( 'SELECT * FROM tasks ORDER BY id DESC;' );
    console.log( "query: " + query);
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
          done();
    }); // end query push
    query.on( 'end', function (){
      console.log("/getTasks END");
      return res.json( results );

    });//end onEnd
    if(err) {
      console.log(err);
    }//end error
  }); // end connect
});//end of /getTasks
app.post('/completedTask',urlencodedParser, function(req,res){
  pg.connect( connectionString, function(err, client, done){
    console.log(req.body);
    var id = req.body.id;
    client.query('UPDATE tasks SET completed=true WHERE completed=false AND id='+id+';');
    done();
  });
});
