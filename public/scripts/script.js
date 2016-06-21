console.log('here we go again script.js sourced');

$(document).ready(function() {
  console.log(' the eye of the tiger ...jquery loaded');

  $( '#submit-button' ).on( 'click', function(){
    console.log( 'submit-button clicked' );

    // get task from input
     var newTask = $( '#taskIn' ).val();
    // create object to post
      var newTaskSet={
        "task": newTask,
        "completed": false
        };// end object
    // send object to server as a post
        $.ajax({
          type: 'POST',
          url: '/createNew',
          data: newTaskSet
     }); // end ajax
  }); // end submit-button

  $('#getTasks').on('click', function(){
    $.ajax({
      type: 'GET',
      url: '/getTasks',
      success: function( newTaskSet ){
        showTasks(newTaskSet);
      } // end success
    }); //end ajax
  });//end getTasks


    $('body').on('click', '.delete', function(){
      console.log('delete task');

      var getID = {
        'id': $(this).attr('data-id')
      };
      $.ajax({
        type: 'POST',
        url:'/deleteTask',
        data: getID,
        success: function( data ) {
          showTasks(data);
          console.log(data);
        }//end success
      });//end  ajax
    });//end  delete

    $('body').on('click', '.completed', function(){
      console.log('completed task');
      var getID = {
          "id" : $(this).attr('data-id')
      };

      $.ajax({
        type: 'POST',
        url: '/completedTask',
        data: getID,
        success: function( data ){
          showTasks(data);
          console.log(data);// deactivateUser ();
        } // end success
      }); //end ajax
    });//end completed

      function showTasks( newtask ){
        console.table( 'in showTasks:' + newtask );
        //$('#outputDiv').empty();
        for( i=0; i<newtask.length; i++ )
        {
          var taskOut = "<p>" + newtask[ i ].task + "</p>";
          $('#outputDiv').append( taskOut );
          var deleteButton = "<button class='delete' data-id='" + newtask[ i ].id + "'>Remove Task" + "</button>";
          $('#outputDiv').append( deleteButton);
          var taskButton = "<button class='completed' data-id='" + newtask[ i ].id + "'>Cross out " + newtask [i].task + "</button>";
          $('#outputDiv').append( taskButton );

        } // end for loop

      } // end show tasks

}); // end jQuery
