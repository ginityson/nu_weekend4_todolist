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
  //put in getusers on click ajax
}); // end jQuery
//   $('#submit-button').on(click, function() {
//     console.log('the please push me button has been pushed');
//   });
//
//
// });
