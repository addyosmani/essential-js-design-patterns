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
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration

// A module_id (myModule) is used here for demonstration purposes only
define('myModule', ['foo', 'bar'], (foo, bar) => {
  // return a value that defines the module export
  // (i.e the functionality we want to expose for consumption)

  // create your module here
  const myModule = {
    doStuff() {
      console.log('Yay! Stuff');
    },
  };

  return myModule;
});

// An alternative version could be..
define('myModule', ['math', 'graph'], (math, graph) =>
  // Note that this is a slightly different pattern
  // With AMD, it's possible to define modules in a few
  // different ways due to it's flexibility with
  // certain aspects of the syntax
  ({
    plot(x, y) {
      return graph.drawPie(math.randomGrid(x, y));
    },
  }));


//********************** Snippet 3 **********************//
// Consider "foo" and "bar" are two external modules
// In this example, the "exports" from the two modules
// loaded are passed as function arguments to the
// callback (foo and bar) so that they can similarly be accessed
// [ES2015+] We used new arrow function syntax
// [SE2015+] We used new keyword let, which declares a block scope local variable
 
require(['foo', 'bar'], (foo, bar) => {
  // rest of your code here
  foo.doSomething();
});

//********************** Snippet 4 **********************//
define(require => {
  let isReady = false;
  let foobar;

  // note the inline require within our module definition
  require(['foo', 'bar'], (foo, bar) => {
    isReady = true;
    foobar = foo() + bar();
  });

  // we can still return a module
  // [ES2015+] New shorthand property names in object creation, if variable name equal to object key
  return {
    isReady,
    foobar,
  };
});


//********************** Snippet 5 **********************//
// With AMD, it's possible to load in assets of almost any kind
// including text-files and HTML. This enables us to have template
// dependencies which can be used to skin components either on
// page-load or dynamically.
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration

 
define(
  ['./templates', 'text!./template.md', 'css!./template.css'], 
  (templates, template) => {
  console.log(templates);
  // do something with our templates here
});

//********************** Snippet 6 **********************//
require(['app/myModule'], myModule => {
  // start the main module which in-turn
  // loads other modules
  const module = new myModule();
  module.doStuff();
});

//********************** Snippet 7 **********************//
curl(
  ['app/myModule.js'],
  myModule => {
    // start the main module which in-turn
    // loads other modules
    const module = new myModule();
    module.doStuff();
  }
);


//********************** Snippet 8 **********************//
// This could be compatible with jQuery's Deferred implementation,
// futures.js (slightly different syntax) or any one of a number
// of other implementations
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
 

define(["lib/Deferred"], Deferred => {
  const defer = new Deferred();

  require(["lib/templates/?index.html","lib/data/?stats"],
      (template, data) => {
        // [ES2015+] New shorthand property names in object creation, if variable name equal to object key
          defer.resolve( { template, data } );
      }
  );
  return defer.promise();
});


//*******************************************************//
// AMD Modules With Dojo
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
define(['dijit/Tooltip'], Tooltip => {
 
  //Our dijit tooltip is now available for local use
  new Tooltip(...);

});

//********************** Snippet 2 **********************//
define(['dojo/cookie', 'dijit/Tooltip'], (cookie, Tooltip) => {
 
  const cookieValue = cookie('cookieName');
  new Tooltip(...);

});

//********************** Snippet 3 **********************//
define(['dojo', 'dijit', 'dojo/cookie', 'dijit/Tooltip'], function(dojo, dijit){
  var cookieValue = dojo.cookie('cookieName');
  new dijit.Tooltip(...);
});


//*******************************************************//
// AMD Module Design Patterns (Dojo)
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [SE2015+] We used new keyword let, which declares a block scope local variable

// mylib/UpdatableObservable: a Decorator for dojo/store/Observable
define(['dojo', 'dojo/store/Observable'], (dojo, Observable) =>
  function UpdatableObservable(store) {
    const observable = dojo.isFunction(store.notify)
      ? store
      : new Observable(store);

    observable.updated = object => {
      dojo.when(object, function(itemOrArray) {
        dojo.forEach([].concat(itemOrArray), this.notify, this);
      });
    };

    return observable;
  });

// Decorator consumer
// a consumer for mylib/UpdatableObservable

define(['mylib/UpdatableObservable'], makeUpdatable => {
  let observable;
  let updatable;
  let someItem;

  // make the observable store updatable
  updatable = makeUpdatable(observable); // `new` is optional!

  // we can then call .updated() later on if we wish to pass
  // on data that has changed
  //updatable.updated( updatedItem );
});


//********************** Snippet 2 **********************//
// [ES2015+] We used new arrow function syntax

// "mylib/Array" adapts `each` function to mimic jQuerys:
define(['dojo/_base/lang', 'dojo/_base/array'], (lang, array) =>
  lang.delegate(array, {
    each(arr, lambda) {
      array.forEach(arr, (item, i) => {
        lambda.call(item, i, item); // like jQuery's each
      });
    },
  }));

// Adapter consumer
// "myapp/my-module":
define(['mylib/Array'], array => {
  array.each(['uno', 'dos', 'tres'], (i, esp) => {
    // here, `this` == item
  });
});



//*******************************************************//
// AMD Modules With jQuery
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
define(
  ['js/jquery.js', 'js/jquery.color.js', 'js/underscore.js'], 
  ($, colorPlugin, _) => {
  // Here we've passed in jQuery, the color plugin and Underscore
  // None of these will be accessible in the global scope, but we
  // can easily reference them below.

  // Pseudo-randomize an array of colors, selecting the first
  // item in the shuffled array
  const shuffleColor = _.first(_.shuffle(['#666', '#333', '#111']));

  // Animate the background-color of any elements with the class
  // "item" on the page using the shuffled color
  $('.item').animate({ backgroundColor: shuffleColor });

  // What we return can be used by other modules
  return {};
});

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

// Account for the existence of more than one global
// instances of jQuery in the document, cater for testing
// .noConflict()

const jQuery = this.jQuery || 'jQuery';

const $ = this.$ || '$';
const originaljQuery = jQuery;
const original$ = $;

define(['jquery'], $ => {
  $('.items').css('background', 'green');
  return () => {};
});
