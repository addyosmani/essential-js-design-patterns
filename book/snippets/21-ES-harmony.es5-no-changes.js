//*******************************************************//
// Modules With Imports And Exports
//*******************************************************//

//********************** Snippet 1 **********************//
module staff{
  // specify (public) exports that can be consumed by
  // other modules
  export var baker = {
      bake: function( item ){
          console.log( "Woo! I just baked " + item );
      }
  }
}

module skills{
  export var specialty = "baking";
  export var experience = "5 years";
}

module cakeFactory{

  // specify dependencies
  import baker from staff;

  // import everything with wildcards
  import * from skills;

  export var oven = {
      makeCupcake: function( toppings ){
          baker.bake( "cupcake", toppings );
      },
      makeMuffin: function( mSize ){
          baker.bake( "muffin", size );
      }
  }
}


//*******************************************************//
// Modules Loaded From Remote Sources
//*******************************************************//

//********************** Snippet 1 **********************//
module cakeFactory from "http://addyosmani.com/factory/cakes.js";
cakeFactory.oven.makeCupcake( "sprinkles" );
cakeFactory.oven.makeMuffin( "large" );


//*******************************************************//
// Module Loader API
//*******************************************************//

//********************** Snippet 1 **********************//
Loader.load( "http://addyosmani.com/factory/cakes.js",
    function( cakeFactory ){
        cakeFactory.oven.makeCupcake( "chocolate" );
    });


//*******************************************************//
// CommonJS-like Modules For The Server
//*******************************************************//

//********************** Snippet 1 **********************//
// io/File.js
export function open( path ) { ... };
export function close( hnd ) { ... };

//********************** Snippet 2 **********************//
// compiler/LexicalHandler.js
module file from "io/File";
 
import { open, close } from file;
export function scan( in ) {
    try {
        var h = open( in ) ...
    }
    finally { close( h ) }
}

//********************** Snippet 3 **********************//
module lexer from "compiler/LexicalHandler";
module stdlib from "@std";
 
//... scan(cmdline[0]) ...


//*******************************************************//
// Classes With Constructors, Getters & Setters
//*******************************************************//

//********************** Snippet 1 **********************//
class Cake{
 
  // We can define the body of a class" constructor
  // function by using the keyword "constructor" followed
  // by an argument list of public and private declarations.
  constructor( name, toppings, price, cakeSize ){
      public name = name;
      public cakeSize = cakeSize;
      public toppings = toppings;
      private price = price;

  }

  // As a part of ES.next's efforts to decrease the unnecessary
  // use of "function" for everything, you'll notice that it's
  // dropped for cases such as the following. Here an identifier
  // followed by an argument list and a body defines a new method

  addTopping( topping ){
      public( this ).toppings.push( topping );
  }

  // Getters can be defined by declaring get before
  // an identifier/method name and a curly body.
  get allToppings(){
      return public( this ).toppings;
  }

  get qualifiesForDiscount(){
      return private( this ).price > 5;
  }

  // Similar to getters, setters can be defined by using
  // the "set" keyword before an identifier
  set cakeSize( cSize ){
      if( cSize < 0 ){
          throw new Error( "Cake must be a valid size -
          either small, medium or large" );
      }
      public( this ).cakeSize = cSize;
  }


}
