//*******************************************************//
// Automating nested namespacing
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const application = {
  utilities: {
    drawing: {
      canvas: {
        to2d: {
          //...
        },
      },
    },
  },
};

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [SE2015+] We used new keyword let, which declares a block scope local variable

// top-level namespace being assigned an object literal
const myApp = myApp || {};

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
const extend = (ns, ns_string) => {
  const parts = ns_string.split('.');
  let parent = ns;
  let pl;

  pl = parts.length;

  for (let i = 0; i < pl; i++) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }

    parent = parent[parts[i]];
  }

  return parent;
}

// Usage:
// extend myApp with a deeply nested namespace
const mod = extend(myApp, 'modules.module2');

// the correct object with nested depths is output
console.log(mod);

// minor test to check the instance of mod can also
// be used outside of the myApp namesapce as a clone
// that includes the extensions

// Outputs: true
console.log(mod == myApp.modules.module2);

// further demonstration of easier nested namespace
// assignment using extend
extend(myApp, 'moduleA.moduleB.moduleC.moduleD');
extend(myApp, 'longer.version.looks.like.this');
console.log(myApp);


//*******************************************************//
// Dependency declaration pattern
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
// common approach to accessing nested namespaces
myApp.utilities.math.fibonacci(25);
myApp.utilities.math.sin(56);
myApp.utilities.drawing.plot(98, 50, 60);

// with local/cached references
const utils = myApp.utilities;

const maths = utils.math;
const drawing = utils.drawing;

// easier to access the namespace
maths.fibonacci(25);
maths.sin(56);
drawing.plot(98, 50, 60);

// note that the above is particularly performant when
// compared to hundreds or thousands of calls to nested
// namespaces vs. a local reference to the namespace


//*******************************************************//
// Deep object extension
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new constructor object method declaration

// extend.js
// Written by Andrew Dupont, optimized by Addy Osmani

const extend = (destination, source) => {
  const toString = Object.prototype.toString;
  const objTest = toString.call({});

  for (const property in source) {
    if (source[property] && objTest === toString.call(source[property])) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
}

console.group('objExtend namespacing tests');

// define a top-level namespace for usage
const myNS = myNS || {};

// 1. extend namespace with a "utils" object
extend(myNS, {
  utils: {
    //...
  },
});

console.log('test 1', myNS);
// myNS.utils now exists

// 2. extend with multiple depths (namespace.hello.world.wave)
extend(myNS, {
  hello: {
    world: {
      wave: {
        test() {
          //...
        },
      },
    },
  },
});

// test direct assignment works as expected
myNS.hello.test1 = 'this is a test';
myNS.hello.world.test2 = 'this is another test';
console.log('test 2', myNS);

// 3. what if myNS already contains the namespace being added
// (e.g. "library")? we want to ensure no namespaces are being
// overwritten during extension

myNS.library = {
  foo() {},
};

extend(myNS, {
  library: {
    bar() {
      //...
    },
  },
});

// confirmed that extend is operating safely (as expected)
// myNS now also contains library.foo, library.bar
console.log('test 3', myNS);

// 4. what if we wanted easier access to a specific namespace without having
// to type the whole namespace out each time?

const shorterAccess1 = myNS.hello.world;
shorterAccess1.test3 = 'hello again';
console.log('test 4', myNS);

//success, myApp.hello.world.test3 is now "hello again"

console.groupEnd();


//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new constructor object method declaration

// top-level namespace
const myApp = myApp || {};

// directly assign a nested namespace
myApp.library = {
  foo() {
    //...
  },
};

// deep extend/merge this namespace with another
// to make things interesting, let's say it's a namespace
// with the same name but with a different function
// signature: $.extend( deep, target, object1, object2 )
$.extend(true, myApp, {
  library: {
    bar() {
      //...
    },
  },
});

console.log('test', myApp);
// myApp now contains both library.foo() and library.bar() methods
// nothing has been overwritten which is what we're hoping for.
