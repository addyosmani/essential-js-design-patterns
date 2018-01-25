//*******************************************************//
// Object Literals
//*******************************************************//

//********************** Snippet 1 **********************//

var myObjectLiteral = {
 
  variableKey: variableValue,

  functionKey: function () {
    // ...
  }
};

//********************** Snippet 2 **********************//

var myModule = {
 
  myProperty: "someValue",
 
  // object literals can contain properties and methods.
  // e.g we can define a further object for module configuration:
  myConfig: {
    useCaching: true,
    language: "en"
  },
 
  // a very basic method
  saySomething: function () {
    console.log( "Where in the world is Paul Irish today?" );
  },
 
  // output a value based on the current configuration
  reportMyConfig: function () {
    console.log( "Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled") );
  },
 
  // override the current configuration
  updateMyConfig: function( newConfig ) {
 
    if ( typeof newConfig === "object" ) {
      this.myConfig = newConfig;
      console.log( this.myConfig.language );
    }
  }
};
 
// Outputs: Where in the world is Paul Irish today?
myModule.saySomething();
 
// Outputs: Caching is: enabled
myModule.reportMyConfig();
 
// Outputs: fr
myModule.updateMyConfig({
  language: "fr",
  useCaching: false
});
 
// Outputs: Caching is: disabled
myModule.reportMyConfig();

//*******************************************************//
// The Module Pattern
//*******************************************************//

//********************** Snippet 1 **********************//

var testModule = (function () {
 
  var counter = 0;
 
  return {
 
    incrementCounter: function () {
      return counter++;
    },
 
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };
 
})();
 
// Usage:
 
// Increment our counter
testModule.incrementCounter();
 
// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();

//********************** Snippet 2 **********************//

var myNamespace = (function () {
 
  var myPrivateVar, myPrivateMethod;
 
  // A private counter variable
  myPrivateVar = 0;
 
  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      console.log( foo );
  };
 
  return {
 
    // A public variable
    myPublicVar: "foo",
 
    // A public function utilizing privates
    myPublicFunction: function( bar ) {
 
      // Increment our private counter
      myPrivateVar++;
 
      // Call our private method using bar
      myPrivateMethod( bar );
 
    }
  };
 
})();

//********************** Snippet 3 **********************//

var basketModule = (function () {
 
  // privates
 
  var basket = [];
 
  function doSomethingPrivate() {
    //...
  }
 
  function doSomethingElsePrivate() {
    //...
  }
 
  // Return an object exposed to the public
  return {
 
    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },
 
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
 
    // Public alias to a private function
    doSomething: doSomethingPrivate,
 
    // Get the total value of items in the basket
    getTotal: function () {
 
      var q = this.getItemCount(),
          p = 0;
 
      while (q--) {
        p += basket[q].price;
      }
 
      return p;
    }
  };
})();

//********************** Snippet 4 **********************//

// basketModule returns an object with a public API we can use
 
basketModule.addItem({
  item: "bread",
  price: 0.5
});
 
basketModule.addItem({
  item: "butter",
  price: 0.3
});
 
// Outputs: 2
console.log( basketModule.getItemCount() );
 
// Outputs: 0.8
console.log( basketModule.getTotal() );
 
// However, the following will not work:
 
// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// public API
console.log( basketModule.basket );
 
// This also won't work as it only exists within the scope of our
// basketModule closure, but not in the returned public object
console.log( basket );

//*******************************************************//
// Module Pattern Variations
//*******************************************************//

//********************** Snippet 1 **********************//

// Global module
var myModule = (function ( jQ, _ ) {
 
  function privateMethod1(){
      jQ(".container").html("test");
  }

  function privateMethod2(){
    console.log( _.min([10, 5, 100, 2, 1000]) );
  }

  return{
      publicMethod: function(){
          privateMethod1();
      }
  };

// Pull in jQuery and Underscore
})( jQuery, _ );

myModule.publicMethod();

//********************** Snippet 2 **********************//

// Global module
var myModule = (function () {
 
  // Module object
  var module = {},
    privateVariable = "Hello World";
 
  function privateMethod() {
    // ...
  }
 
  module.publicProperty = "Foobar";
  module.publicMethod = function () {
    console.log( privateVariable );
  };
 
  return module;
 
})();

//********************** Snippet 3 **********************//

var store = window.store || {};
 
if ( !store["basket"] ) {
  store.basket = {};
}
 
if ( !store.basket["core"] ) {
  store.basket.core = {};
}
 
store.basket.core = {
  // ...rest of our logic
};

//********************** Snippet 4 **********************//

require(["dojo/_base/customStore"], function( store ){
 
  // using dojo.setObject()
  store.setObject( "basket.core", (function() {
 
      var basket = [];
 
      function privateMethod() {
          console.log(basket);
      }
 
      return {
          publicMethod: function(){
                  privateMethod();
          }
      };
 
  })());
 
});

//********************** Snippet 5 **********************//

// create namespace
Ext.namespace("myNameSpace");
 
// create application
myNameSpace.app = function () {
 
  // do NOT access DOM from here; elements don't exist yet
 
  // private variables
  var btn1,
      privVar1 = 11;
 
  // private functions
  var btn1Handler = function ( button, event ) {
      console.log( "privVar1=" + privVar1 );
      console.log( "this.btn1Text=" + this.btn1Text );
    };
 
  // public space
  return {
    // public properties, e.g. strings to translate
    btn1Text: "Button 1",
 
    // public methods
    init: function () {
 
      if ( Ext.Ext2 ) {
 
        btn1 = new Ext.Button({
          renderTo: "btn1-ct",
          text: this.btn1Text,
          handler: btn1Handler
        });
 
      } else {
 
        btn1 = new Ext.Button( "btn1-ct", {
          text: this.btn1Text,
          handler: btn1Handler
        });
 
      }
    }
  };
}();

//********************** Snippet 6 **********************//

Y.namespace( "store.basket" ) ;
Y.store.basket = (function () {
 
    var myPrivateVar, myPrivateMethod;
 
    // private variables:
    myPrivateVar = "I can be accessed only within Y.store.basket.";
 
    // private method:
    myPrivateMethod = function () {
        Y.log( "I can be accessed only from within YAHOO.store.basket" );
    }
 
    return {
        myPublicProperty: "I'm a public property.",
 
        myPublicMethod: function () {
            Y.log( "I'm a public method." );
 
            // Within basket, I can access "private" vars and methods:
            Y.log( myPrivateVar );
            Y.log( myPrivateMethod() );
 
            // The native scope of myPublicMethod is store so we can
            // access public members using "this":
            Y.log( this.myPublicProperty );
        }
    };
 
})();

//********************** Snippet 7 **********************//

function library( module ) {
 
  $( function() {
    if ( module.init ) {
      module.init();
    }
  });
 
  return module;
}
 
var myLibrary = library(function () {
 
  return {
    init: function () {
      // module implementation
    }
  };
}());