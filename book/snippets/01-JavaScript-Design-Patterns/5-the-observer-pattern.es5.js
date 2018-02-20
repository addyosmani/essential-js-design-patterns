//********************** Snippet 1 **********************//

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};

//********************** Snippet 2 **********************//

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};

//********************** Snippet 3 **********************//

// The Observer
function Observer() {
    this.update = function () {
        // ...
    };
}

//********************** Snippet 4 **********************//

<button id="addNewObserver">Add New Observer checkbox</button>
<input id="mainCheckbox" type="checkbox"/>
<div id="observersContainer"></div>

//********************** Snippet 5 **********************//

// Extend an object with an extension
function extend( obj, extension ){
    for ( var key in extension ){
      obj[key] = extension[key];
    }
  }
   
  // References to our DOM elements
   
  var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );
   
   
  // Concrete Subject
   
  // Extend the controlling checkbox with the Subject class
  extend( controlCheckbox, new Subject() );
   
  // Clicking the checkbox will trigger notifications to its observers
  controlCheckbox.onclick = function(){
    controlCheckbox.notify( controlCheckbox.checked );
  };
   
  addBtn.onclick = addNewObserver;
   
  // Concrete Observer
   
  function addNewObserver(){
   
    // Create a new checkbox to be added
    var check = document.createElement( "input" );
    check.type = "checkbox";
   
    // Extend the checkbox with the Observer class
    extend( check, new Observer() );
   
    // Override with custom update behaviour
    check.update = function( value ){
      this.checked = value;
    };
   
    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver( check );
   
    // Append the item to the container
    container.appendChild( check );
  }

//*******************************************************//
// Differences Between The Observer And Publish/Subscribe Pattern
//*******************************************************//

//********************** Snippet 1 **********************//

// A very simple new mail handler
 
// A count of the number of messages received
var mailCounter = 0;
 
// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".
 
// Render a preview of new messages
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  // Log the topic for debugging purposes
  console.log( "A new message was received: ", topic );
 
  // Use the data that was passed from our subject
  // to display a message preview to the user
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body );
 
});
 
// Here's another subscriber using the same data to perform
// a different task.
 
// Update the counter displaying the number of new
// messages received via the publisher
 
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  $('.newMessageCounter').html( ++mailCounter );
 
});
 
publish( "inbox/newMessage", [{
  sender: "hello@google.com",
  body: "Hey there! How are you doing today?"
}]);
 
// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows:
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );


//*******************************************************//
// Publish/Subscribe Implementations
//*******************************************************//

//********************** Snippet 1 **********************//

// Publish
 
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$( el ).trigger( "/login", [{username:"test", userData:"test"}] );
 
// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish( "/login", [{username:"test", userData:"test"}] );
 
// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish( "/login", {username:"test", userData:"test"} );
 
 
// Subscribe
 
// jQuery: $(obj).on( "channel", [data], fn );
$( el ).on( "/login", function( event ){...} );
 
// Dojo: dojo.subscribe( "channel", fn);
var handle = dojo.subscribe( "/login", function(data){..} );
 
// YUI: el.on("channel", handler);
el.on( "/login", function( data ){...} );
 
 
// Unsubscribe
 
// jQuery: $(obj).off( "channel" );
$( el ).off( "/login" );
 
// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe( handle );
 
// YUI: el.detach("channel");
el.detach( "/login" );

//********************** Snippet 2 **********************//

var pubsub = {};
 
(function(myObject) {
 
    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};
 
    // A topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function( topic, args ) {
 
        if ( !topics[topic] ) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func( topic, args );
        }
 
        return this;
    };
 
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {
 
        if (!topics[topic]) {
            topics[topic] = [];
        }
 
        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
 
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));

//********************** Snippet 3 **********************//

// Another simple message handler
 
// A simple message logger that logs any topics and data received through our
// subscriber
var messageLogger = function ( topics, data ) {
    console.log( "Logging: " + topics + ": " + data );
};
 
// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );
 
// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:
 
pubsub.publish( "inbox/newMessage", "hello world!" );
 
// or
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );
 
// or
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});
 
// We can also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe( subscription );
 
// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );

//********************** Snippet 4 **********************//

// Return the current local time to be used in our UI later
getCurrentTime = function (){
 
    var date = new Date(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          y = date.getFullYear(),
          t = date.toLocaleTimeString().toLowerCase();
  
         return (m + "/" + d + "/" + y + " " + t);
 };
  
 // Add a new row of data to our fictional grid component
 function addGridRow( data ) {
  
    // ui.grid.addRow( data );
    console.log( "updated grid component with:" + data );
  
 }
  
 // Update our fictional grid to show the time it was last
 // updated
 function updateCounter( data ) {
  
    // ui.grid.updateLastChanged( getCurrentTime() );
    console.log( "data last updated at: " + getCurrentTime() + " with " + data);
  
 }
  
 // Update the grid using the data passed to our subscribers
 gridUpdate = function( topic, data ){
  
   if ( data !== undefined ) {
      addGridRow( data );
      updateCounter( data );
    }
  
 };
  
 // Create a subscription to the newDataAvailable topic
 var subscriber = pubsub.subscribe( "newDataAvailable", gridUpdate );
  
 // The following represents updates to our data layer. This could be
 // powered by ajax requests which broadcast that new data is available
 // to the rest of the application.
  
 // Publish changes to the gridUpdated topic representing new entries
 pubsub.publish( "newDataAvailable", {
   summary: "Apple made $5 billion",
   identifier: "APPL",
   stockPrice: 570.91
 });
  
 pubsub.publish( "newDataAvailable", {
   summary: "Microsoft made $20 million",
   identifier: "MSFT",
   stockPrice: 30.85
 });

//********************** Snippet 5 **********************//

<script id="userTemplate" type="text/html">
   <li><%= name %></li>
</script> 
 
<script id="ratingsTemplate" type="text/html">
   <li><strong><%= title %></strong> was rated <%= rating %>/5</li>
</script>
 
 
<div id="container">
 
   <div class="sampleForm">
       <p>
           <label for="twitter_handle">Twitter handle:</label>
           <input type="text" id="twitter_handle" />
       </p>
       <p>
           <label for="movie_seen">Name a movie you've seen this year:</label>
           <input type="text" id="movie_seen" />
       </p>
       <p>
 
           <label for="movie_rating">Rate the movie you saw:</label>
           <select id="movie_rating">
                 <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5" selected>5</option>
 
          </select>
        </p>
        <p>
 
            <button id="add">Submit rating</button>
        </p>
    </div>
 
 
 
    <div class="summaryTable">
        <div id="users"><h3>Recent users</h3></div>
        <div id="ratings"><h3>Recent movies rated</h3></div>
    </div>
 
 </div>


//********************** Snippet 6 **********************//

;(function( $ ) {
 
    // Pre-compile templates and "cache" them using closure
    var
      userTemplate = _.template($( "#userTemplate" ).html()),
      ratingsTemplate = _.template($( "#ratingsTemplate" ).html());
   
    // Subscribe to the new user topic, which adds a user
    // to a list of users who have submitted reviews
    $.subscribe( "/new/user", function( e, data ){
   
      if( data ){
   
        $('#users').append( userTemplate( data ));
   
      }
   
    });
   
    // Subscribe to the new rating topic. This is composed of a title and
    // rating. New ratings are appended to a running list of added user
    // ratings.
    $.subscribe( "/new/rating", function( e, data ){
   
      if( data ){
   
        $( "#ratings" ).append( ratingsTemplate( data ) );
   
      }
   
    });
   
    // Handler for adding a new user
    $("#add").on("click", function( e ) {
   
      e.preventDefault();
   
      var strUser = $("#twitter_handle").val(),
         strMovie = $("#movie_seen").val(),
         strRating = $("#movie_rating").val();
   
      // Inform the application a new user is available
      $.publish( "/new/user", { name: strUser } );
   
      // Inform the app a new rating is available
      $.publish( "/new/rating", { title: strMovie, rating: strRating} );
   
      });
   
  })( jQuery );


  //********************** Snippet 7 **********************//

  <form id="flickrSearch">
 
   <input type="text" name="tag" id="query"/>
 
   <input type="submit" name="submit" value="submit"/>
 
</form>
 
 
 
<div id="lastQuery"></div>
 
<ol id="searchResults"></ol>
 
 
 
<script id="resultTemplate" type="text/html">
    <% _.each(items, function( item ){ %>
        <li><img src="<%= item.media.m %>"/></li>
    <% });%>
</script>

  //********************** Snippet 8 **********************//

  ;(function( $ ) {
 
    // Pre-compile template and "cache" it using closure
    var resultTemplate = _.template($( "#resultTemplate" ).html());
  
    // Subscribe to the new search tags topic
    $.subscribe( "/search/tags", function( e, tags ) {
        $( "#lastQuery" )
                 .html("<p>Searched for:<strong>" + tags + "</strong></p>");
    });
  
    // Subscribe to the new results topic
    $.subscribe( "/search/resultSet", function( e, results ){
  
        $( "#searchResults" ).empty().append(resultTemplate( results ));
  
    });
  
    // Submit a search query and publish tags on the /search/tags topic
    $( "#flickrSearch" ).submit( function( e ) {
  
        e.preventDefault();
        var tags = $(this).find( "#query").val();
  
        if ( !tags ){
         return;
        }
  
        $.publish( "/search/tags", [ $.trim(tags) ]);
  
    });
  
  
    // Subscribe to new tags being published and perform
    // a search query using them. Once data has returned
    // publish this data for the rest of the application
    // to consume
  
    $.subscribe("/search/tags", function( e, tags ) {
  
        $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
               tags: tags,
               tagmode: "any",
               format: "json"
             },
  
           function( data ){
  
               if( !data.items.length ) {
                 return;
               }
  
               $.publish( "/search/resultSet", { items: data.items } );
        });
  
    });
  
  
 })( jQuery );