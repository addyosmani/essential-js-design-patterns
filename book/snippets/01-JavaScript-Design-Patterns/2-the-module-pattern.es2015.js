//*******************************************************//
// Object Literals
//*******************************************************//

//********************** Snippet 1 **********************//

// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new method declaration
const myObjectLiteral = {

    variableKey: variableValue,

    functionKey() {
        // ...
    }
};
//********************** Snippet 2 **********************//

// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new method declaration
const myModule = {
    myProperty: 'someValue',
  
    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    myConfig: {
      useCaching: true,
      language: 'en',
    },
  
    // a very basic method
    saySomething() {
      console.log('Where in the world is Paul Irish today?');
    },
  
    // output a value based on the current configuration
    // [ES2015+] We used new template literals for string interpolation
    reportMyConfig() {
      console.log(
        `Caching is: ${this.myConfig.useCaching ? 'enabled' : 'disabled'}`
      );
    },
  
    // override the current configuration
    updateMyConfig(newConfig) {
      if (typeof newConfig === 'object') {
        this.myConfig = newConfig;
        console.log(this.myConfig.language);
      }
    },
  };
  
  // Outputs: Where in the world is Paul Irish today?
  myModule.saySomething();
  
  // Outputs: Caching is: enabled
  myModule.reportMyConfig();
  
  // Outputs: fr
  myModule.updateMyConfig({
    language: 'fr',
    useCaching: false,
  });
  
  // Outputs: Caching is: disabled
  myModule.reportMyConfig();
  
//*******************************************************//
// The Module Pattern
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We have new pattern implementation with new keywords import and export
// [ES2015+] The import statement is used to import bindings which are exported by another module.
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new keyword const for immutable constant declaration

let counter = 0;

const testModule = {
  incrementCounter() {
    return counter++;
  },
  resetCounter() {
    console.log(`counter value prior to reset: ${counter}`);
    counter = 0;
  },
};

// [ES2015+] Default export module, without name
export default testModule;

// Usage:

// [ES2015+] Import module from path
import testModule from './testModule';

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();


//********************** Snippet 2 **********************//

// [ES2015+] We have new pattern implementation with new keywords import and export
// [ES2015+] The import statement is used to import bindings which are exported by another module.
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new keyword const for immutable constant declaration

// A private counter variable
let myPrivateVar = 0;

// A private function which logs any arguments
// [ES2015+] Parentheses are optional when there is only one parameter
const myPrivateMethod = foo => {
  console.log(foo);
};

const myNamespace = {
  // A public variable
  myPublicVar: 'foo',

  // A public function utilizing privates
  myPublicFunction(bar) {
    // Increment our private counter
    myPrivateVar++;

    // Call our private method using bar
    myPrivateMethod(bar);
  },
};

// [ES2015+] Default export module, without name
export default myNamespace;


//********************** Snippet 3 **********************//
// [ES2015+] We have new pattern implementation with new keywords import and export
// [ES2015+] The import statement is used to import bindings which are exported by another module.
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new keyword const for immutable constant declaration

// privates

const basket = [];

const doSomethingPrivate = () => {
  //...
};

const doSomethingElsePrivate = () => {
  //...
};

// Create an object exposed to the public
const basketModule = {
  // Add items to our basket
  addItem(values) {
    basket.push(values);
  },

  // Get the count of items in the basket
  getItemCount() {
    return basket.length;
  },

  // Public alias to a private function
  doSomething() {
    doSomethingPrivate();
  },

  // Get the total value of items in the basket
  // [ES2015+] The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
  getTotal() {
    return basket.reduce((currentSum, item) => item.price + currentSum, 0);
  },
};
// [ES2015+] Default export module, without name
export default basketModule;

//********************** Snippet 4 **********************//
// [ES2015+] Import module from path
import basketModule from './basketModule';

// basketModule returns an object with a public API we can use

basketModule.addItem({
  item: 'bread',
  price: 0.5,
});

basketModule.addItem({
  item: 'butter',
  price: 0.3,
});

// Outputs: 2
console.log(basketModule.getItemCount());

// Outputs: 0.8
console.log(basketModule.getTotal());

// However, the following will not work:

// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// public API
console.log(basketModule.basket);

// This also won't work as it only exists within the scope of our
// basketModule closure, but not in the returned public object
console.log(basket);


//*******************************************************//
// Module Pattern Variations
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We have new pattern implementation with new keywords import and export
// [ES2015+] The import statement is used to import bindings which are exported by another module.
// [ES2015+] We used new keyword const for immutable constant declaration

const privateMethod1 = () => {
    $(".container").html("test");
}

const privateMethod2 = () => {
    console.log(_.min([10, 5, 100, 2, 1000]));
}

const myModule = {
    publicMethod() {
        privateMethod1();
    }
};

// [ES2015+] Default export module, without name
export default myModule;


// [ES2015+] Import module from path
import myModule from './MyModule';

myModule.publicMethod();

//********************** Snippet 2 **********************//
// [ES2015+] We have new pattern implementation with new keywords import and export
// [ES2015+] The import statement is used to import bindings which are exported by another module.

// Module object
const module = {};
const privateVariable = 'Hello World';

const privateMethod = () => {
  // ...
};

module.publicProperty = 'Foobar';
module.publicMethod = () => {
  console.log(privateVariable);
};

// [ES2015+] Default export module, without name
export default module;


//*******************************************************//
// Toolkit And Framework-specific Module Pattern Implementations
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const store = window.store || {};

if (!store['basket']) {
  store.basket = {};
}

if (!store.basket['core']) {
  store.basket.core = {};
}

store.basket.core = {
  // ...rest of our logic
};

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

require(['dojo/_base/customStore'], store => {
  // using dojo.setObject()
  store.setObject(
    'basket.core',
    (() => {
      const basket = [];

      const privateMethod = () => {
        console.log(basket);
      };

      return {
        publicMethod() {
          privateMethod();
        },
      };
    })()
  );
});


//********************** Snippet 3 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new template literals for string interpolation

// create namespace
Ext.namespace('myNameSpace');

// create application
myNameSpace.app = (() => {
  // do NOT access DOM from here; elements don't exist yet

  // private variables
  let btn1;
  const privVar1 = 11;

  // private functions
  const btn1Handler = (button, event) => {
    console.log(`privVar1=${privVar1}`);
    console.log(`this.btn1Text=${this.btn1Text}`);
  };

  // public space
  return {
    // public properties, e.g. strings to translate
    btn1Text: 'Button 1',

    // public methods
    init() {
      if (Ext.Ext2) {
        btn1 = new Ext.Button({
          renderTo: 'btn1-ct',
          text: this.btn1Text,
          handler: btn1Handler,
        });
      } else {
        btn1 = new Ext.Button('btn1-ct', {
          text: this.btn1Text,
          handler: btn1Handler,
        });
      }
    },
  };
})();


//********************** Snippet 4 **********************//
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

Y.namespace('store.basket');
Y.store.basket = (() => {
  let myPrivateVar;
  let myPrivateMethod;

  // private variables:
  myPrivateVar = 'I can be accessed only within Y.store.basket.';

  // private method:
  myPrivateMethod = () => {
    Y.log('I can be accessed only from within YAHOO.store.basket');
  };

  return {
    myPublicProperty: "I'm a public property.",

    myPublicMethod() {
      Y.log("I'm a public method.");

      // Within basket, I can access "private" vars and methods:
      Y.log(myPrivateVar);
      Y.log(myPrivateMethod());

      // The native scope of myPublicMethod is store so we can
      // access public members using "this":
      Y.log(this.myPublicProperty);
    },
  };
})();

//********************** Snippet 5 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

const library = module => {
  $(() => {
    if (module.init) {
      module.init();
    }
  });

  return module;
};

const myLibrary = library(
  (() => ({
    init() {
      // module implementation
    },
  }))()
);

