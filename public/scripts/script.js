console.log('here we go again script.js sourced');

$(document).ready(function() {
  console.log('it was the eye of the tiger jquery loaded');
  $( '#submit-button' ).on( 'click', function(){
    console.log( 'submit-button clicked' );
    // get task from input
     var newTask = $( '#taskIn' ).val();
    // create object to post
      var newTaskSet={
        "task": newTask,
        "completed": true
        };// end object
    // send object to server as a post
        $.ajax({
          type: 'POST',
          url: '/createNew',
          data: newTaskSet
     }); // end ajax
  }); // end addbutton
  $('#getUsers').on('click', function(){
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      success: function( data ){
      showUsers( data );
      } // end success
    }); //end ajax
  });
  function showUsers( users ){
    console.log( 'in showUsers:' + users );
    for( i=0; i<users.length; i++ )
    {
      var userOut = "<p>" + users[ i ].username + ", active: " + users[ i ].active + " created: " + users[ i ].created + "</p>";
      $('#outputDiv').append( userOut );
      var userButton = "<button data-id='" + users[ i ].id + "'>Deactivate " + users[ i ].username + "</button>";
      $('#outputDiv').append( userButton );

    } // end for loop
  } // end show users

  // //put in getusers on click ajax
  // $('#getUsers').on('click', function(){
  //   $.ajax({
  //     type: 'GET',
  //     url: '/getUsers',
  //     success: function( data ){
  //     showUsers( data );
  //     } // end success
  //   }); //end ajax
  // });
  // function showUsers( users ){
  //   console.log( 'in showUsers:' + users );
  //   for( i=0; i<users.length; i++ )
  //   {
  //     var userOut = "<p>" + users[ i ].username + ", active: " + users[ i ].active + " created: " + users[ i ].created + "</p>";
  //     $('#outputDiv').append( userOut );
  //     var userButton = "<button data-id='" + users[ i ].id + "'>Deactivate " + users[ i ].username + "</button>";
  //     $('#outputDiv').append( userButton );
  //
  //   } // end for loop
  // } // end show users

}); // end jQuery
