//*******************************************************//
// Sub-classing
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method

class Person {
    constructor(firstName, lastName) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = "male";

    }
}
//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method
// [ES2015+] We have new pattern implementation with new inheritance

// a new instance of Person can then easily be created as follows:
const clark = new Person("Clark", "Kent");

// Define a subclass constructor for for "Superhero":
class Superhero extends Person {
    constructor(firstName, lastName, powers) {

        // Invoke the superclass constructor on the new object
        // then use .call() to invoke the constructor as a method of
        // the object to be initialized.

        super(firstName, lastName);

        // Finally, store their powers, a new array of traits not found in a normal "Person"
        this.powers = powers;
    }
}

const superman = new Superhero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(superman);

// Outputs Person attributes as well as powers

//*******************************************************//
// Mixins
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new method declaration

const myMixins = {

    moveUp() {
        console.log("move up");
    },

    moveDown() {
        console.log("move down");
    },

    stop() {
        console.log("stop! in the name of love!");
    },

};

//********************** Snippet 2 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We have new pattern implementation with new inheritance


// A skeleton carAnimator constructor
class CarAnimator  {
    moveLeft() {
      console.log("move left");
    }
  }
  // A skeleton personAnimator constructor
  class PersonAnimator  {
    moveRandomly() { /*..*/ };
  }
  // [ES2015+] New Object.assign() method copies enumerable and own properties from a source object (second argument) to a target object (first argument).
  Object.assign(CarAnimator.prototype, myMixins);
  Object.assign(PersonAnimator.prototype, myMixins);
  
  // Create a new instance of carAnimator
  const myAnimator = new CarAnimator();
  myAnimator.moveLeft();
  myAnimator.moveDown();
  myAnimator.stop();
  
  // Outputs:
  // move left
  // move down
  // stop! in the name of love!

//********************** Snippet 3 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We still could use Object.prototype for adding new methods, because internally we use the same structure
// [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// TODO: Сonsider implementation by Justin Fagnani http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/


// Define a simple Car constructor
class Car {
    constructor({ model, color }) {
      this.model = model || "no model provided";
      this.color = color || "no colour provided";
    }
  }
  
// Mixin
class Mixin {
    driveForward() {
      console.log("drive forward");
    }
  
    driveBackward() {
      console.log("drive backward");
    }
  
    driveSideways() {
      console.log("drive sideways");
    }
  }


// Extend an existing object with a method from another
// [ES2015+] The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
const augment = (receivingClass, givingClass, ...methodsNames) => {
    // only provide certain methods
    if (methodsNames.length === 0) {
      // [ES2015+] New function map calls a provided callback function once for each element in an array, in order.  
      methodsNames.map((methodName) => {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      });
  
      // provide all methods
    } else {
      // [ES2015+] New method Object.getOwnPropertyNames() returns an array of all properties (including non-enumerable properties)
      Object.getOwnPropertyNames(givingClass.prototype).map((methodName) => {
        // check to make sure the receiving class doesn't
        // have a method of the same name as the one currently
        // being processed
        if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
          receivingClass.prototype[methodName] = givingClass.prototype[methodName];
          // Alternatively (check prototype chain as well):
          // if ( !receivingClass.prototype[methodName] ) {
          // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
          // }
        }
      });
    }
  };


// Augment the Car constructor to include "driveForward" and "driveBackward"
augment(Car, Mixin, "driveForward", "driveBackward");

// Create a new Car
const myCar = new Car({
  model: "Ford Escort",
  color: "blue",
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment(Car, Mixin);

const mySportsCar = new Car({
  model: "Porsche",
  color: "red",
});

mySportsCar.driveSideways();

// Outputs:
// drive sideways