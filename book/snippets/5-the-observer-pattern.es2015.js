//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [SE2015+] We used new keyword let, which declares a block scope local variabl

class ObserverList {
    constructor() {
        this.observerList = [];
    }

    add(obj) {
        return this.observerList.push(obj);
    }

    count() {
        return this.observerList.length;
    }

    get(index) {
        if (index > -1 && index < this.observerList.length) {
            return this.observerList[index];
        }
    }

    indexOf(obj, startIndex) {
        let i = startIndex;

        while (i < this.observerList.length) {
            if (this.observerList[i] === obj) {
                return i;
            }
            i++;
        }

        return -1;
    }

    removeAt(index) {
        this.observerList.splice(index, 1);
    }
}

//********************** Snippet 2 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [SE2015+] We used new keyword let, which declares a block scope local variabl

class Subject {
    constructor() {
        this.observers = new ObserverList();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
    }

    notify(context) {
        const observerCount = this.observers.count();
        for (let i = 0; i < observerCount; i++) {
            this.observers.get(i).update(context);
        }
    }
}

//********************** Snippet 3 **********************//

// The Observer
class Observer {
    constructor() {}
    update() {
        // ...
    }
}

//********************** Snippet 4 **********************//

<button id="addNewObserver">Add New Observer checkbox</button>
<input id="mainCheckbox" type="checkbox"/>
<div id="observersContainer"></div>

//********************** Snippet 5 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We have new pattern implementation with new inheritance
// [ES2015+] The extends keyword is used to create a class which is a child of another class.
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

// Concrete Subject

class ConcreteSubject extends Subject {
    constructor(element) {
        super();
        this.element = element;

        // Clicking the checkbox will trigger notifications to its observers
        this.element.onclick = () => {
            this.notify(this.element.checked);
        };
    }
}

// Concrete Observer

class ConcreteObserver extends Observer {
    constructor(element) {
        super();
        this.element = element;
    }

    // Override with custom update behaviour
    update(value) {
        this.element.checked = value;
    }
}

// References to our DOM elements
const addBtn = document.getElementById('addNewObserver');
const container = document.getElementById('observersContainer');
const controlCheckbox = new ConcreteSubject(document.getElementById('mainCheckbox'));

const addNewObserver = () => {
    // Create a new checkbox to be added
    const check = document.createElement('input');
    check.type = 'checkbox';
    const checkObserver = new ConcreteObserver(check);

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(checkObserver);

    // Append the item to the container
    container.appendChild(check);
};

addBtn.onclick = addNewObserver;


//*******************************************************//
// Differences Between The Observer And Publish/Subscribe Pattern
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

// A very simple new mail handler

// A count of the number of messages received
let mailCounter = 0;

// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".

// Render a preview of new messages
const subscriber1 = subscribe("inbox/newMessage", (topic, data) => {

    // Log the topic for debugging purposes
    console.log("A new message was received: ", topic);

    // Use the data that was passed from our subject
    // to display a message preview to the user
    $(".messageSender").html(data.sender);
    $(".messagePreview").html(data.body);

});

// Here's another subscriber using the same data to perform
// a different task.

// Update the counter displaying the number of new
// messages received via the publisher

const subscriber2 = subscribe("inbox/newMessage", (topic, data) => {

    $('.newMessageCounter').html(++mailCounter);

});

publish("inbox/newMessage", [{
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
$(el).trigger("/login", [{
    username: "test",
    userData: "test"
}]);

// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish("/login", [{
    username: "test",
    userData: "test"
}]);

// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish("/login", {
    username: "test",
    userData: "test"
});

 
// Subscribe
 
// jQuery: $(obj).on( "channel", [data], fn );
$(el).on("/login", (event) => {...});

// Dojo: dojo.subscribe( "channel", fn);
const handle = dojo.subscribe("/login", (data) => {..});

// YUI: el.on("channel", handler);
el.on("/login", (data) => {...});


// Unsubscribe

// jQuery: $(obj).off( "channel" );
$(el).off("/login");

// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe(handle);

// YUI: el.detach("channel");
el.detach("/login");

//********************** Snippet 2 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable

class PubSub {
    constructor() {
        // Storage for topics that can be broadcast
        // or listened to
        this.topics = {};

        // A topic identifier
        this.subUid = -1;
    }

    publish(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }

        const subscribers = this.topics[topic];
        let len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    }

    subscribe(topic, func) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        const token = (++this.subUid).toString();
        this.topics[topic].push({
            token,
            func,
        });
        return token;
    }

    unsubscribe(token) {
        for (const m in this.topics) {
            if (this.topics[m]) {
                for (let i = 0, j = this.topics[m].length; i < j; i++) {
                    if (this.topics[m][i].token === token) {
                        this.topics[m].splice(i, 1);

                        return token;
                    }
                }
            }
        }
        return this;
    }
}

const pubsub = new PubSub();

//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new arrow function syntax

// Another simple message handler

// A simple message logger that logs any topics and data received through our
// subscriber
const messageLogger = (topics, data) => {
    console.log(`Logging: ${topics}: ${data}`);
};

// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
const subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish('inbox/newMessage', 'hello world!');

// or
pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

// or
pubsub.publish('inbox/newMessage', {
    sender: 'hello@google.com',
    body: 'Hey again!',
});

// We can also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe(subscription);

// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish('inbox/newMessage', 'Hello! are you still there?');


//********************** Snippet 4 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new arrow function syntax

// Return the current local time to be used in our UI later
getCurrentTime = () => {
    const date = new Date();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    const t = date.toLocaleTimeString().toLowerCase();

    return `${m}/${d}/${y} ${t}`;
};

// Add a new row of data to our fictional grid component
const addGridRow = (data) => {

    // ui.grid.addRow( data );
    console.log(`updated grid component with:${data}`);

}

// Update our fictional grid to show the time it was last
// updated
const updateCounter = (data) => {

    // ui.grid.updateLastChanged( getCurrentTime() );
    console.log(`data last updated at: ${getCurrentTime()} with ${data}`);

}

// Update the grid using the data passed to our subscribers
const gridUpdate = (topic, data) => {

    if (data !== undefined) {
        addGridRow(data);
        updateCounter(data);
    }

};

// Create a subscription to the newDataAvailable topic
const subscriber = pubsub.subscribe("newDataAvailable", gridUpdate);

// The following represents updates to our data layer. This could be
// powered by ajax requests which broadcast that new data is available
// to the rest of the application.

// Publish changes to the gridUpdated topic representing new entries
pubsub.publish("newDataAvailable", {
    summary: "Apple made $5 billion",
    identifier: "APPL",
    stockPrice: 570.91
});

pubsub.publish("newDataAvailable", {
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
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

;(($ => {
    // Pre-compile templates and "cache" them using closure
    const userTemplate = _.template($("#userTemplate").html());

    const ratingsTemplate = _.template($("#ratingsTemplate").html());

    // Subscribe to the new user topic, which adds a user
    // to a list of users who have submitted reviews
    $.subscribe("/new/user", (e, data) => {

        if (data) {

            $('#users').append(userTemplate(data));

        }

    });

    // Subscribe to the new rating topic. This is composed of a title and
    // rating. New ratings are appended to a running list of added user
    // ratings.
    $.subscribe("/new/rating", (e, data) => {

        if (data) {

            $("#ratings").append(ratingsTemplate(data));

        }

    });

    // Handler for adding a new user
    // [ES2015+] Parentheses are optional when there is only one parameter name
    $("#add").on("click", e => {
        e.preventDefault();

        const strUser = $("#twitter_handle").val();
        const strMovie = $("#movie_seen").val();
        const strRating = $("#movie_rating").val();

        // Inform the application a new user is available
        $.publish("/new/user", {
            name: strUser
        });

        // Inform the app a new rating is available
        $.publish("/new/rating", {
            title: strMovie,
            rating: strRating
        });
    });
}))(jQuery);


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
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new template literals for string interpolation

;(($ => {

    // Pre-compile template and "cache" it using closure
    const resultTemplate = _.template($("#resultTemplate").html());

    // Subscribe to the new search tags topic
    $.subscribe("/search/tags", (e, tags) => {
        $("#lastQuery")
            .html(`<p>Searched for:<strong>${tags}</strong></p>`);
    });

    // Subscribe to the new results topic
    $.subscribe("/search/resultSet", (e, results) => {

        $("#searchResults").empty().append(resultTemplate(results));

    });

    // Submit a search query and publish tags on the /search/tags topic
    $("#flickrSearch").submit(function (e) {

        e.preventDefault();
        const tags = $(this).find("#query").val();

        if (!tags) {
            return;
        }

        $.publish("/search/tags", [$.trim(tags)]);

    });


    // Subscribe to new tags being published and perform
    // a search query using them. Once data has returned
    // publish this data for the rest of the application
    // to consume
    // [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.
    $.subscribe("/search/tags", (e, tags) => {

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                tags,
                tagmode: "any",
                format: "json"
            },
            // [ES2015+] The destructuring assignment as function parameter
            ({ items }) => {

                if (!items.length) {
                    return;
                }
            // [ES2015+] New shorthand property names in object creation, if variable name equal to object key
                $.publish("/search/resultSet", { items });
            });
    });
}))(jQuery);
