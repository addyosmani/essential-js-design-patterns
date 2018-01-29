//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance

// [ES2015+] We have new pattern implementation with new keywords import and export
// TODO: Discuss new implementation, we losing private random here

// Instance stores a reference to the Singleton
let instance;

// Private methods and variables
const privateMethod = () => {
    console.log("I am private");
};
const privateVariable = "Im also private";

// Singleton
class MySingleton {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    constructor() {
        if (!instance) {
            // Public property
            this.randomNumber = Math.random();
            this.publicProperty = "I am also public";
            instance = this;
        }

        return instance;
    }

    // Public methods
    publicMethod() {
        console.log("The public can see me!");
    };

    getRandomNumber() {
        return this.randomNumber;
    }
}
// [ES2015+] Default export module, without name
export default MySingleton;



// Instance stores a reference to the Singleton
let instance;

// Singleton
class MyBadSingleton {
    // Always create a new Singleton instance
    constructor() {
        this.randomNumber = Math.random();
        instance = this;

        return instance;
    }

    getRandomNumber() {
        return this.randomNumber;
    }
}

// [ES2015+] Default export module, without name
export default MyBadSingleton;


// Usage:
// [ES2015+] The import statement is used to import bindings which are exported by another module.
import MySingleton from './MySingleton';
import MyBadSingleton from './MyBadSingleton';

const singleA = new MySingleton();
const singleB = new MySingleton();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

const badSingleA = new MyBadSingleton();
const badSingleB = new MyBadSingleton();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.

//********************** Snippet 2 **********************//
// [ES2015+] We used new constructor method

constructor() {
    if (this._instance == null) {
        if (isFoo()) {
            this._instance = new FooSingleton();
        } else {
            this._instance = new BasicSingleton();
        }
    }

    return this._instance;
}

//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance

// options: an object containing configuration options for the singleton
// e.g var options = { name: "test", pointX: 5};
class Singleton {
    constructor(options) {
        // set options to the options supplied
        // or an empty object if none are provided
        options = options || {};
        // set some properties for our singleton
        this.name = "SingletonTester";
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }
}

// our instance holder
let instance;

// an emulation of static variables and methods
const SingletonTester = {
    name: "SingletonTester",
    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance(options) {
        if (instance === undefined) {
            instance = new Singleton(options);
        }

        return instance;
    }
};

const singletonTest = SingletonTester.getInstance({
    pointX: 5
});

// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log(singletonTest.pointX);
