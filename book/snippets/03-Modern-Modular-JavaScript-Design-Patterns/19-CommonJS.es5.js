//*******************************************************//
// Getting Started
//*******************************************************//

//********************** Snippet 1 **********************//
// package/lib is a dependency we require
var lib = require( "package/lib" );
 
// behaviour for our module
function foo(){
    lib.log( "hello world!" );
}
 
// export (expose) foo to other modules
exports.foo = foo;

//********************** Snippet 2 **********************//
// define more behaviour we would like to expose
function foobar(){
  this.foo = function(){
    console.log( "Hello foo" );
  }
 
  this.bar = function(){
    console.log( "Hello bar" );
  }
}
 
// expose foobar to other modules
exports.foobar = foobar;
 
// an application consuming "foobar"
 
// access the module relative to the path
// where both usage and module files exist
// in the same directory
 
var foobar = require("./foobar").foobar,
    test   = new foobar();
 
// Outputs: "Hello bar"
test.bar();

//********************** Snippet 3 **********************//
define(function(require){
  var lib = require( "package/lib" );

   // some behaviour for our module
   function foo(){
       lib.log( "hello world!" );
   }

   // export (expose) foo for other modules
   return {
       foobar: foo
   };
});

//********************** Snippet 4 **********************//
var modA = require( "./foo" );
var modB = require( "./bar" );
 
exports.app = function(){
    console.log( "Im an application!" );
}
 
exports.foo = function(){
    return modA.helloWorld();
}

//********************** Snippet 5 **********************//
exports.name = "bar";

//********************** Snippet 6 **********************//
require( "./bar" );
exports.helloWorld = function(){
    return "Hello World!!"
}
