//*******************************************************//
// 1. Single global variables
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
const myApplication = (() => ({
  function() {
    //...
  },
}))();


//*******************************************************//
// 2. Prefix namespacing
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
const myApplication_propertyA = {};
const myApplication_propertyB = {};
function myApplication_myMethod() {
  //...
}

//*******************************************************//
// 3. Object literal notation
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
const myApplication = {
  // As we've seen, we can easily define functionality for
  // this object literal..
  getInfo() {
    //...
  },

  // but we can also populate it to support
  // further object namespaces containing anything
  // anything we wish:
  models: {},
  views: {
    pages: {},
  },
  collections: {},
};

//********************** Snippet 2 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration
// [ES2015+] Equivalent to: => { return "bar"; }
myApplication.foo = () => 'bar';

myApplication.utils = {
  toString() {
    //...
  },
  export() {
    //...
  },
};


//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

// This doesn't check for existence of "myApplication" in
// the global namespace. Bad practice as we can easily
// clobber an existing variable/namespace with the same name
const myApplication = {};

// The following options *do* check for variable/namespace existence.
// If already defined, we use that instance, otherwise we assign a new
// object literal to myApplication.
//
// Option 1: const myApplication = myApplication || {};
// Option 2: if( !MyApplication ){ MyApplication = {} };
// Option 3: window.myApplication || ( window.myApplication = {} );
// Option 4: const myApplication = $.fn.myApplication = function() {};
// Option 5: const myApplication = myApplication === undefined ? {} : myApplication;

//********************** Snippet 4 **********************//
myApplication || (myApplication = {});

//********************** Snippet 5 **********************//
// [ES2015+] We used new arrow function syntax

const foo = () => {
  myApplication || (myApplication = {});
}

// myApplication hasn't been initialized,
// so foo() throws a ReferenceError

foo();

// However accepting myApplication as an
// argument

const foo = (myApplication) => {
  myApplication || (myApplication = {});
}

foo();

 
// Even if myApplication === undefined, there is no error
// and myApplication gets set to {} correctly

//********************** Snippet 6 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

// If we were to define a new plugin..
const myPlugin = $.fn.myPlugin = () => { ... };
 
// Then later rather than having to type:
$.fn.myPlugin.defaults = {};
 
// We can do:
myPlugin.defaults = {};

//********************** Snippet 7 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration

const namespace = ((() => {
  // defined within the local scope
  const privateMethod1 = () => { /* ... */ };

  const privateMethod2 = () => { /* ... */ };
  const privateProperty1 = "foobar";

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
}))();

//********************** Snippet 8 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const myConfig = {
  language: 'english',

  defaults: {
    enableGeolocation: true,
    enableSharing: false,
    maxPhotos: 20,
  },

  theme: {
    skin: 'a',
    toolbars: {
      index: 'ui-navigation-toolbar',
      pages: 'ui-custom-toolbar',
    },
  },
};


//*******************************************************//
// 4. Nested namespacing
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
YAHOO.util.Dom.getElementsByClassName('test');

//********************** Snippet 2 **********************//
const myApp = myApp || {};

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
myApp['routers'] = myApp['routers'] || {};
myApp['models'] = myApp['models'] || {};
myApp['controllers'] = myApp['controllers'] || {};


//*******************************************************//
// 5. Immediately-invoked Function Expressions (IIFE)s
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
// an (anonymous) immediately-invoked function expression
(() => {
  /*...*/
})();

// a named immediately-invoked function expression
(function foobar() {
  /*..*/
})();

//********************** Snippet 2 **********************//
// named self-executing function
function foobar() {
  foobar();
}

// anonymous self-executing function
// [ES2015+] The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

const foobar = (...args) => {
  args.callee();
};

//********************** Snippet 3 **********************//
const namespace = namespace || {};

// here a namespace object is passed as a function
// parameter, where we assign public methods and
// properties to it
(o => {
  o.foo = 'foo';
  // [ES2015+] Equivalent to: => { return "bar"; } 
  o.bar = () => 'bar';
})(namespace);

console.log(namespace);


//********************** Snippet 4 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

// namespace (our namespace name) and undefined are passed here
// to ensure 1. namespace can be modified locally and isn't
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly
// undefined. This is to avoid issues with undefined being
// mutable pre-ES5.

;((namespace, undefined) => {
  // private properties
  const foo = 'foo';

  const bar = 'bar';

  // public methods and properties
  namespace.foobar = 'foobar';

  namespace.say = msg => {
    speak(msg);
  };

  namespace.sayHello = () => {
    namespace.say('hello world');
  };

  // private method
  function speak(msg) {
    console.log(`You said: ${msg}`);
  }
})((window.namespace = window.namespace || {}));

// we can then test our properties and methods as follows

// public

// Outputs: foobar
console.log(namespace.foobar);

// Outputs: You said: hello world
namespace.sayHello();

// assigning new properties
namespace.foobar2 = 'foobar';

// Outputs: foobar
console.log(namespace.foobar2);


//********************** Snippet 5 **********************//
// [ES2015+] We used new arrow function syntax

// let's extend the namespace with new functionality
((namespace, undefined) => {
  // public method
  namespace.sayGoodbye = () => {
    namespace.say('goodbye');
  };
})((window.namespace = window.namespace || {}));

// Outputs: goodbye
namespace.sayGoodbye();



//*******************************************************//
// 6. Namespace injection
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
const myApp = myApp || {};
myApp.utils = {};

(function() {
  let val = 5;

  this.getValue = () => val;

  this.setValue = newVal => {
    val = newVal;
  };

  // also introduce a new sub-namespace
  this.tools = {};
}.apply(myApp.utils));

// inject new behaviour into the tools namespace
// which we defined via the utilities module

(function() {
  this.diagnose = () => 'diagnosis';
}.apply(myApp.utils.tools));

// note, this same approach to extension could be applied
// to a regular IIFE, by just passing in the context as
// an argument and modifying the context rather than just
// "this"

// Usage:

// Outputs our populated namespace
console.log(myApp);

// Outputs: 5
console.log(myApp.utils.getValue());

// Sets the value of `val` and returns it
myApp.utils.setValue(25);
console.log(myApp.utils.getValue());

// Testing another level down
console.log(myApp.utils.tools.diagnose());


//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [SE2015+] We used new keyword let, which declares a block scope local variable

// define a namespace we can use later
const ns = ns || {};

const ns2 = ns2 || {};

// the module/namespace creator
const creator = function(val) {
  let val = val || 0;

  this.next = () => val++;

  this.reset = () => {
    val = 0;
  };
};

creator.call(ns);

// ns.next, ns.reset now exist
creator.call(ns2, 5000);

// ns2 contains the same methods
// but has an overridden value for val
// of 5000
