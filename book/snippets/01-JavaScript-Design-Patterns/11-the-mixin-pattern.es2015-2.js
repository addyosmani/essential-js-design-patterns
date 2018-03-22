//*******************************************************//
// Mixins
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new method declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] Class can be used as an expression as well as a statement. As an expression it returns a new class each time it's evaluated.
// [ES2015+] The extends keyword is used to create a class which is a child of another class.
// [ES2015+] The extends clause accepts arbitrary expressions that return classes or constructors
// [ES2015+] All we need to define a mixin is a function that accepts a superclass and creates a new subclass from it, like this:

const MyMixins = superclass =>
    class extends superclass {
        moveUp() {
            console.log('move up');
        }
        moveDown() {
            console.log('move down');
        }
        stop() {
            console.log('stop! in the name of love!');
        }
    };

//********************** Snippet 2 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We have new pattern implementation with new inheritance

// A skeleton carAnimator constructor
class CarAnimator {
    moveLeft() {
        console.log('move left');
    }
}
// A skeleton personAnimator constructor
class PersonAnimator {
    moveRandomly() {
        /*..*/
    }
}

// [ES2015+] Then we can use it in an extends clause like this:
class MyAnimator extends MyMixins(CarAnimator) {}

// Create a new instance of carAnimator
const myAnimator = new MyAnimator();
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
// [ES2015+] The extends keyword is used to create a class which is a child of another class.
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

// Define a simple Car constructor
class Car {
    constructor({ model, color }) {
        this.model = model || 'no model provided';
        this.color = color || 'no colour provided';
    }
}

// Mixin
const Mixin = superclass =>
    class extends superclass {
        driveForward() {
            console.log('drive forward');
        }
        driveBackward() {
            console.log('drive backward');
        }
        driveSideways() {
            console.log('drive sideways');
        }
    };

class MyCar extends Mixin(Car) {}

// Create a new Car
const myCar = new MyCar({
    model: 'Ford Escort',
    color: 'blue',
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

const mySportCar = new MyCar({
    model: 'Porsche',
    color: 'red',
});

mySportsCar.driveSideways();

// Outputs:
// drive sideways
