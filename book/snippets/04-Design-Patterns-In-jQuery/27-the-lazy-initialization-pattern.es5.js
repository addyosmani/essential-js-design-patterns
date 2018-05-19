//********************** Snippet 1 **********************//
$( document ).ready( function () {
 
  // The ajax request won't attempt to execute until
  // the DOM is ready

  var jqxhr = $.ajax({
    url: "http://domain.com/api/",
    data: "display=latest&order=ascending"
  })
  .done( function( data ) ){
      $(".status").html( "content loaded" );
      console.log( "Data output:" + data );
  });

});

//********************** Snippet 2 **********************//
bindReady: function() {
  if ( readyList ) {
    return;
  }
 
  readyList = jQuery.Callbacks( "once memory" );
 
  // Catch cases where $(document).ready() is called after the
  // browser event has already occurred.
  if ( document.readyState === "complete" ) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    return setTimeout( jQuery.ready, 1 );
  }
 
  // Mozilla, Opera and webkit support this event
  if ( document.addEventListener ) {
    // Use the handy event callback
    document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
 
    // A fallback to window.onload, that will always work
    window.addEventListener( "load", jQuery.ready, false );
 
  // If IE event model is used
  } else if ( document.attachEvent ) {
    // ensure firing before onload,
    // maybe late but safe also for iframes
    document.attachEvent( "onreadystatechange", DOMContentLoaded );
 
    // A fallback to window.onload, that will always work
    window.attachEvent( "onload", jQuery.ready );
 
    // If IE and not a frame
    // continually check to see if the document is ready
    var toplevel = false;
 
    try {
      toplevel = window.frameElement == null;
    } catch(e) {}
 
    if ( document.documentElement.doScroll && toplevel ) {
      doScrollCheck();
    }
  }
},
