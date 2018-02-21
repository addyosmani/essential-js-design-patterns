//*******************************************************//
// 1. Single global variables
//*******************************************************//

//********************** Snippet 1 **********************//
var myApplication = (function () {
  function() {
    //...
  },
  return {
    //...
  }
})();


//*******************************************************//
// 2. Prefix namespacing
//*******************************************************//

//********************** Snippet 1 **********************//
var myApplication_propertyA = {};
var myApplication_propertyB = {};
function myApplication_myMethod() {
  //...
}


//*******************************************************//
// 3. Object literal notation
//*******************************************************//

//********************** Snippet 1 **********************//
var myApplication = {
 
  // As we've seen, we can easily define functionality for
  // this object literal..
  getInfo: function() {
    //...
  },
 
  // but we can also populate it to support
  // further object namespaces containing anything
  // anything we wish:
  models: {},
  views: {
      pages: {}
  },
  collections: {}
};

//********************** Snippet 2 **********************//
myApplication.foo = function() {
  return "bar";
}
 
myApplication.utils = {
  toString: function() {
      //...
  },
  export: function() {
      //...
  }
}

//********************** Snippet 3 **********************//
// This doesn't check for existence of "myApplication" in
// the global namespace. Bad practice as we can easily
// clobber an existing variable/namespace with the same name
var myApplication = {};
 
// The following options *do* check for variable/namespace existence.
// If already defined, we use that instance, otherwise we assign a new
// object literal to myApplication.
//
// Option 1: var myApplication = myApplication || {};
// Option 2: if( !MyApplication ){ MyApplication = {} };
// Option 3: window.myApplication || ( window.myApplication = {} );
// Option 4: var myApplication = $.fn.myApplication = function() {};
// Option 5: var myApplication = myApplication === undefined ? {} : myApplication;

//********************** Snippet 4 **********************//
myApplication || (myApplication = {});

//********************** Snippet 5 **********************//
function foo() {
  myApplication || ( myApplication = {} );
}
 
// myApplication hasn't been initialized,
// so foo() throws a ReferenceError
 
foo();
 
// However accepting myApplication as an
// argument
 
function foo( myApplication ) {
  myApplication || ( myApplication = {} );
}
 
foo();
 
// Even if myApplication === undefined, there is no error
// and myApplication gets set to {} correctly

//********************** Snippet 6 **********************//
// If we were to define a new plugin..
var myPlugin = $.fn.myPlugin = function() { ... };
 
// Then later rather than having to type:
$.fn.myPlugin.defaults = {};
 
// We can do:
myPlugin.defaults = {};

//********************** Snippet 7 **********************//
var namespace = (function () {
 
  // defined within the local scope
  var privateMethod1 = function () { /* ... */ },
      privateMethod2 = function () { /* ... */ },
      privateProperty1 = "foobar";

return {

  // the object literal returned here can have as many
  // nested depths as we wish, however as mentioned,
  // this way of doing things works best for smaller,
  // limited-scope applications in my personal opinion
  publicMethod1: privateMethod1,

  // nested namespace with public properties
  properties: {
      publicProperty1: privateProperty1
  },

  // another tested namespace
  utils: {
      publicMethod2: privateMethod2
  }
  ...
}
})();

//********************** Snippet 8 **********************//
var myConfig = {
 
  language: "english",
 
  defaults: {
    enableGeolocation: true,
    enableSharing: false,
    maxPhotos: 20
  },
 
  theme: {
    skin: "a",
    toolbars: {
      index: "ui-navigation-toolbar",
      pages: "ui-custom-toolbar"
    }
  }
}

//*******************************************************//
// 4. Nested namespacing
//*******************************************************//

//********************** Snippet 1 **********************//
YAHOO.util.Dom.getElementsByClassName("test");

//********************** Snippet 2 **********************//
var myApp = myApp || {};
 
// perform a similar existence check when defining nested
// children
myApp.routers = myApp.routers || {};
myApp.model = myApp.model || {};
myApp.model.special = myApp.model.special || {};
 
// nested namespaces can be as complex as required:
// myApp.utilities.charting.html5.plotGraph(/*..*/);
// myApp.modules.financePlanner.getSummary();
// myApp.services.social.facebook.realtimeStream.getLatest();

//********************** Snippet 3 **********************//
myApp["routers"] = myApp["routers"] || {};
myApp["models"] = myApp["models"] || {};
myApp["controllers"] = myApp["controllers"] || {};


//*******************************************************//
// 5. Immediately-invoked Function Expressions (IIFE)s
//*******************************************************//

//********************** Snippet 1 **********************//
// an (anonymous) immediately-invoked function expression
(function () { /*...*/ })();
 
// a named immediately-invoked function expression
(function foobar () { /*..*/ })();

//********************** Snippet 2 **********************//
// named self-executing function
function foobar () { foobar(); }
 
// anonymous self-executing function
var foobar = function () { arguments.callee(); }

//********************** Snippet 3 **********************//
var namespace = namespace || {};
 
// here a namespace object is passed as a function
// parameter, where we assign public methods and
// properties to it
(function( o ) {
  o.foo = "foo";
  o.bar = function() {
    return "bar";
  };
})( namespace );
 
console.log( namespace );

//********************** Snippet 4 **********************//
// namespace (our namespace name) and undefined are passed here
// to ensure 1. namespace can be modified locally and isn't
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly
// undefined. This is to avoid issues with undefined being
// mutable pre-ES5.
 
;(function ( namespace, undefined ) {
 
  // private properties
  var foo = "foo",
      bar = "bar";
 
  // public methods and properties
  namespace.foobar = "foobar";
 
  namespace.say = function ( msg ) {
    speak( msg );
  };
 
  namespace.sayHello = function () {
    namespace.say( "hello world" );
  };
 
  // private method
  function speak(msg) {
    console.log( "You said: " + msg );
  };
 
  // check to evaluate whether "namespace" exists in the
  // global namespace - if not, assign window.namespace an
  // object literal
 
})( window.namespace = window.namespace || {} );
 
 
// we can then test our properties and methods as follows
 
// public
 
// Outputs: foobar
console.log( namespace.foobar );
 
// Outputs: You said: hello world
namespace.sayHello();
 
// assigning new properties
namespace.foobar2 = "foobar";
 
// Outputs: foobar
console.log( namespace.foobar2 );

//********************** Snippet 5 **********************//
// let's extend the namespace with new functionality
(function( namespace, undefined ) {
 
  // public method
  namespace.sayGoodbye = function () {
    namespace.say( "goodbye" );
  }
})( window.namespace = window.namespace || {});
 
// Outputs: goodbye
namespace.sayGoodbye();


//*******************************************************//
// 6. Namespace injection
//*******************************************************//

//********************** Snippet 1 **********************//
var myApp = myApp || {};
myApp.utils = {};
 
(function () {
  var val = 5;
 
  this.getValue = function () {
    return val;
  };
 
  this.setValue = function( newVal ) {
    val = newVal;
  }
 
  // also introduce a new sub-namespace
  this.tools = {};
 
}).apply( myApp.utils );
 
// inject new behaviour into the tools namespace
// which we defined via the utilities module
 
(function () {
    this.diagnose = function() {
      return "diagnosis";
    }
}).apply( myApp.utils.tools );
 
// note, this same approach to extension could be applied
// to a regular IIFE, by just passing in the context as
// an argument and modifying the context rather than just
// "this"
 
// Usage:
 
// Outputs our populated namespace
console.log( myApp );
 
// Outputs: 5
console.log( myApp.utils.getValue() );
 
// Sets the value of `val` and returns it
myApp.utils.setValue( 25 );
console.log( myApp.utils.getValue() );
 
// Testing another level down
console.log( myApp.utils.tools.diagnose() );

//********************** Snippet 2 **********************//
// define a namespace we can use later
var ns = ns || {},
    ns2 = ns2 || {};
 
// the module/namespace creator
var creator = function( val ) {
 
  var val = val || 0;
 
  this.next = function () {
    return val++
  };
 
  this.reset = function () {
    val = 0;
  };
};
 
creator.call( ns );
 
// ns.next, ns.reset now exist
creator.call( ns2, 5000 );
 
// ns2 contains the same methods
// but has an overridden value for val
// of 5000
