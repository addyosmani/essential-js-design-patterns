//*******************************************************//
// Object Creation
//*******************************************************//

//********************** Snippet 1 **********************//

// [ES2015+] We used new keyword const for immutable constant declaration
// Each of the following options will create a new empty object:

const newObject = {};

// or
const newObject = Object.create(Object.prototype);

// or
const newObject = new Object();


//********************** Snippet 2 **********************//

// ECMAScript 3 compatible approaches

// 1. Dot syntax

// Set properties
newObject.someKey = "Hello World";

// Get properties
// [ES2015+] We used new keyword const for immutable constant declaration
const value = newObject.someKey;



// 2. Square bracket syntax
// This syntax requred if key name contains spaces 
// This syntax requred if key name stored in variable

// Set properties
newObject["Some Key"] = "Hello World";
newObject[VariableName] = "Hello World";

// Get properties
// [ES2015+] We used new keyword const for immutable constant declaration
const value = newObject["Some Key"];
const value = newObject[VariableName];


// ECMAScript 5 only compatible approaches
// For more information see: http://kangax.github.com/es5-compat-table/

// 3. Object.defineProperty

// Set properties
Object.defineProperty(newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});


// If the above feels a little difficult to read, a short-hand could
// be written as follows:
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function expression syntax
const defineProp = (obj, key, value) => {
    const config = {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    };
    Object.defineProperty(obj, key, config);
};

// To use, we then create a new empty "person" object
// [ES2015+] We used new keyword const for immutable constant declaration
const person = Object.create(Object.prototype);

// Populate the object with properties
defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);

console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}


// 4. Object.defineProperties

// Set properties
Object.defineProperties(newObject, {

    "someKey": {
        value: "Hello World",
        writable: true
    },

    "anotherKey": {
        value: "Foo bar",
        writable: false
    }

});

// Getting properties for 3. and 4. can be done using any of the
// options in 1. and 2.


//********************** Snippet 3 **********************//

// Usage:

// Create a race car driver that inherits from the person object
// [ES2015+] We used new keyword const for immutable constant declaration
const driver = Object.create(person);

// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");

// Get an inherited property (1981)
console.log(driver.dateOfBirth);

// Get the property we set (100mph)
console.log(driver.topSpeed);


//*******************************************************//
// Basic Constructors
//*******************************************************//

//********************** Snippet 1 **********************//

// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new template literals for string interpolation
class Car {
    constructor(model, year, miles) {
        this.model = model;
        this.year = year;
        this.miles = miles;
    }

    toString() {
        return `${this.model} has done ${this.miles} miles`;
    }
}

// Usage:

// We can create new instances of the car
// [ES2015+] We used new keyword const for immutable constant declaration
const civic = new Car("Honda Civic", 2009, 20000);
const mondeo = new Car("Ford Mondeo", 2010, 5000);

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log(civic.toString());
console.log(mondeo.toString());

//*******************************************************//
// Constructors With Prototypes
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] All of it new syntax sugar above old function structures
class Car {
    constructor(model, year, miles) {
        this.model = model;
        this.year = year;
        this.miles = miles;
    }
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
// [ES2015+] We still could use Object.prototype for adding new methods, because internally we use the same structure
// [ES2015+] We used new template literals for string interpolation
Car.prototype.toString = function () {
    return `${this.model} has done ${this.miles} miles`;
};

// Usage:
// [ES2015+] We used new keyword const for immutable constant declaration
const civic = new Car("Honda Civic", 2009, 20000);
const mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
