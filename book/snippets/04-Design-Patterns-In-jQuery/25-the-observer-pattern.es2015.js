//********************** Snippet 1 **********************//
// Equivalent to subscribe(topicName, callback)
$(document).on('topicName', function() {
    //..perform some behaviour
});

// Equivalent to publish(topicName)
$(document).trigger('topicName');

// Equivalent to unsubscribe(topicName)
$(document).off('topicName');

//********************** Snippet 2 **********************//
jQuery.event = {

  add: function( elem, types, handler, data, selector ) {

    var elemData, eventHandle, events,
      t, tns, type, namespaces, handleObj,
      handleObjIn, quick, handlers, special;

    ...

    // Init the element's event structure and main handler,
    //if this is the first
    events = elemData.events;
    if ( !events ) {
      elemData.events = events = {};
    }
    ...

    // Handle multiple events separated by a space
    // jQuery(...).bind("mouseover mouseout", fn);
    types = jQuery.trim( hoverHack(types) ).split( " " );
    for ( t = 0; t < types.length; t++ ) {

      ...

      // Init the event handler queue if we're the first
      handlers = events[ type ];
      if ( !handlers ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener/attachEvent if the special
        // events handler returns false
        if ( !special.setup || special.setup.call( elem, data,
        //namespaces, eventHandle ) === false ) {
          // Bind the global event handler to the element
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

          } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
          }
        }
      }

//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

const topics = {};

jQuery.Topic = id => {
    let callbacks;
    let topic = id && topics[id];
    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove,
        };
        if (id) {
            topics[id] = topic;
        }
    }
    return topic;
};

//********************** Snippet 4 **********************//
// Subscribers
$.Topic('mailArrived').subscribe(fn1);
$.Topic('mailArrived').subscribe(fn2);
$.Topic('mailSent').subscribe(fn1);

// Publisher
$.Topic('mailArrived').publish('hello world!');
$.Topic('mailSent').publish('woo! mail!');

// Here, "hello world!" gets pushed to fn1 and fn2
// when the "mailArrived" notification is published
// with "woo! mail!" also being pushed to fn1 when
// the "mailSent" notification is published.

// Outputs:
// hello world!
// fn2 says: hello world!
// woo! mail!
