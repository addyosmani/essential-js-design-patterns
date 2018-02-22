//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const myCar = {
    name: 'Ford Escort',

    drive() {
        console.log("Weeee. I'm driving!");
    },

    panic() {
        console.log('Wait. How do you stop this thing?');
    },
};

// Use Object.create to instantiate a new car
const yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name);

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new template literals for string interpolation

const vehicle = {
    getModel() {
        console.log(`The model of this vehicle is..${this.model}`);
    },
};

const car = Object.create(vehicle, {
    id: {
        value: MY_GLOBAL.nextId(),
        // writable:false, configurable:false by default
        enumerable: true,
    },

    model: {
        value: 'Ford',
        enumerable: true,
    },
});

//********************** Snippet 3 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We have new pattern implementation with new inheritance
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new keyword const for immutable constant declaration

class VehiclePrototype {
    constructor(model) {
        this.model = model;
    }

    getModel() {
        console.log('The model of this vehicle is..' + this.model);
    }

    Clone() {}
}
// [ES2015+] The extends keyword is used to create a class which is a child of another class.
// [ES2015+] A constructor can use the super keyword to call the constructor of the super class.
class Vehicle extends VehiclePrototype {
    constructor(model) {
        super(model);
    }
    Clone() {
        return new Vehicle(this.model);
    }
}

const car = new Vehicle('Ford Escort');
const car2 = car.Clone();
car2.getModel();

//********************** Snippet 4 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method
// [ES2015+] We still could use Object.prototype for adding new methods, because internally we use the same structure

const beget = (() => {
    class F {
        constructor() {}
    }

    return proto => {
        F.prototype = proto;
        return new F();
    };
})();
