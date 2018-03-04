//*******************************************************//
// Getting Started With Modules
//*******************************************************//

//********************** Snippet 1 **********************//
define(
  module_id /*optional*/,
  [dependencies] /*optional*/,
  definition function /*function for instantiating the module or object*/
);

//********************** Snippet 2 **********************//
// A module_id (myModule) is used here for demonstration purposes only
define( "myModule",
 
    ["foo", "bar"],
 
    // module definition function
    // dependencies (foo and bar) are mapped to function parameters
    function ( foo, bar ) {
        // return a value that defines the module export
        // (i.e the functionality we want to expose for consumption)
 
        // create your module here
        var myModule = {
            doStuff: function () {
                console.log( "Yay! Stuff" );
            }
        };
 
    return myModule;
});
 
// An alternative version could be..
define( "myModule",
 
    ["math", "graph"],
 
    function ( math, graph ) {
 
        // Note that this is a slightly different pattern
        // With AMD, it's possible to define modules in a few
        // different ways due to it's flexibility with
        // certain aspects of the syntax
        return {
            plot: function( x, y ){
                return graph.drawPie( math.randomGrid( x, y ) );
            }
        };
});

//********************** Snippet 3 **********************//
// Consider "foo" and "bar" are two external modules
// In this example, the "exports" from the two modules
// loaded are passed as function arguments to the
// callback (foo and bar) so that they can similarly be accessed
 
require(["foo", "bar"], function ( foo, bar ) {
  // rest of your code here
  foo.doSomething();
});

//********************** Snippet 4 **********************//
define(function ( require ) {
  var isReady = false, foobar;

  // note the inline require within our module definition
  require(["foo", "bar"], function ( foo, bar ) {
      isReady = true;
      foobar = foo() + bar();
  });

  // we can still return a module
  return {
      isReady: isReady,
      foobar: foobar
  };
});

//********************** Snippet 5 **********************//
// With AMD, it's possible to load in assets of almost any kind
// including text-files and HTML. This enables us to have template
// dependencies which can be used to skin components either on
// page-load or dynamically.
 
define( ["./templates", "text!./template.md","css!./template.css" ],
 
    function( templates, template ){
        console.log( templates );
        // do something with our templates here
    }
 
);

//********************** Snippet 6 **********************//
require(["app/myModule"],
 
    function( myModule ){
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();
});

//********************** Snippet 7 **********************//
curl(["app/myModule.js"],
 
    function( myModule ){
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();
 
});

//********************** Snippet 8 **********************//
// This could be compatible with jQuery's Deferred implementation,
// futures.js (slightly different syntax) or any one of a number
// of other implementations
 
define(["lib/Deferred"], function( Deferred ){
  var defer = new Deferred();

  require(["lib/templates/?index.html","lib/data/?stats"],
      function( template, data ){
          defer.resolve( { template: template, data:data } );
      }
  );
  return defer.promise();
});


//*******************************************************//
// AMD Modules With Dojo
//*******************************************************//

//********************** Snippet 1 **********************//
define(["dijit/Tooltip"], function( Tooltip ){
 
  //Our dijit tooltip is now available for local use
  new Tooltip(...);

});

//********************** Snippet 2 **********************//
define(["dojo/cookie", "dijit/Tooltip"], function( cookie, Tooltip ){
 
  var cookieValue = cookie( "cookieName" );
  new Tooltip(...);

});

//********************** Snippet 3 **********************//
define(["dojo", "dijit", "dojo/cookie", "dijit/Tooltip"], function( dojo, dijit ){
  var cookieValue = dojo.cookie( "cookieName" );
  new dijit.Tooltip(...);
});


//*******************************************************//
// AMD Module Design Patterns (Dojo)
//*******************************************************//

//********************** Snippet 1 **********************//
// mylib/UpdatableObservable: a Decorator for dojo/store/Observable
define(["dojo", "dojo/store/Observable"], function ( dojo, Observable ) {
  return function UpdatableObservable ( store ) {

      var observable = dojo.isFunction( store.notify ) ? store :
              new Observable(store);

      observable.updated = function( object ) {
          dojo.when( object, function ( itemOrArray) {
              dojo.forEach( [].concat(itemOrArray), this.notify, this );
          });
      };

      return observable;
  };
});


// Decorator consumer
// a consumer for mylib/UpdatableObservable

define(["mylib/UpdatableObservable"], function ( makeUpdatable ) {
  var observable,
      updatable,
      someItem;

  // make the observable store updatable
  updatable = makeUpdatable( observable ); // `new` is optional!

  // we can then call .updated() later on if we wish to pass
  // on data that has changed
  //updatable.updated( updatedItem );
});

//********************** Snippet 2 **********************//
// "mylib/Array" adapts `each` function to mimic jQuerys:
define(["dojo/_base/lang", "dojo/_base/array"], function ( lang, array ) {
  return lang.delegate( array, {
      each: function ( arr, lambda ) {
          array.forEach( arr, function ( item, i ) {
              lambda.call( item, i, item ); // like jQuery's each
          });
      }
  });
});

// Adapter consumer
// "myapp/my-module":
define(["mylib/Array"], function ( array ) {
  array.each( ["uno", "dos", "tres"], function ( i, esp ) {
      // here, `this` == item
  });
});


//*******************************************************//
// AMD Modules With jQuery
//*******************************************************//

//********************** Snippet 1 **********************//
define(["js/jquery.js","js/jquery.color.js","js/underscore.js"],
 
    function( $, colorPlugin, _ ){
        // Here we've passed in jQuery, the color plugin and Underscore
        // None of these will be accessible in the global scope, but we
        // can easily reference them below.
 
        // Pseudo-randomize an array of colors, selecting the first
        // item in the shuffled array
        var shuffleColor = _.first( _.shuffle( ["#666","#333","#111"] ) );
 
        // Animate the background-color of any elements with the class
        // "item" on the page using the shuffled color
        $( ".item" ).animate( {"backgroundColor": shuffleColor } );
 
        // What we return can be used by other modules
        return {};
    });

//********************** Snippet 2 **********************//
// Account for the existence of more than one global
// instances of jQuery in the document, cater for testing
// .noConflict()
 
var jQuery = this.jQuery || "jQuery",
$ = this.$ || "$",
originaljQuery = jQuery,
original$ = $;
 
define(["jquery"], function ( $ ) {
    $( ".items" ).css( "background","green" );
    return function () {};
});
