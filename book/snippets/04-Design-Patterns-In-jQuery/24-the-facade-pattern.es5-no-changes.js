//********************** Snippet 1 **********************//
$.get( url, data, callback, dataType );
$.post( url, data, callback, dataType );
$.getJSON( url, data, callback );
$.getScript( url, callback );

//********************** Snippet 2 **********************//
// $.get()
$.ajax({
  url: url,
  data: data,
  dataType: dataType
}).done( callback );
 
// $.post
$.ajax({
  type: "POST",
  url: url,
  data: data,
  dataType: dataType
}).done( callback );
 
// $.getJSON()
$.ajax({
  url: url,
  dataType: "json",
  data: data,
}).done( callback );
 
// $.getScript()
$.ajax({
  url: url,
  dataType: "script",
}).done( callback );

//********************** Snippet 3 **********************//
// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch( e ) {}
}
 
function createActiveXHR() {
  try {
    return new window.ActiveXObject( "Microsoft.XMLHTTP" );
  } catch( e ) {}
}
 
// Create the request object
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
  /* Microsoft failed to properly
   * implement the XMLHttpRequest in IE7 (can't request local files),
   * so we use the ActiveXObject when it is available
   * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
   * we need a fallback.
   */
  function() {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;
  ...

//********************** Snippet 4 **********************//
    // Request the remote document
    jQuery.ajax({
      url: url,
      type: type,
      dataType: "html",
      data: params,
      // Complete callback (responseText is used internally)
      complete: function( jqXHR, status, responseText ) {
        // Store the response as specified by the jqXHR object
        responseText = jqXHR.responseText;
        // If successful, inject the HTML into all the matched elements
        if ( jqXHR.isResolved() ) {
          // Get the actual response in case
          // a dataFilter is present in ajaxSettings
          jqXHR.done(function( r ) {
            responseText = r;
          });
          // See if a selector was specified
          self.html( selector ?
            // Create a dummy div to hold the results
            jQuery("<div>")
              // inject the contents of the document in, removing the scripts
              // to avoid any 'Permission Denied' errors in IE
              .append(responseText.replace(rscript, ""))
 
              // Locate the specified elements
              .find(selector) :
 
            // If not, just inject the full result
            responseText );
        }
 
        if ( callback ) {
          self.each( callback, [ responseText, status, jqXHR ] );
        }
      }
    });
 
    return this;
  }
</div>
