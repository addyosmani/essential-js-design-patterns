//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.

// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
class Car {
    constructor({
        doors,
        state,
        color
    }) {

        // some defaults
        this.doors = doors || 4;
        this.state = state || "brand new";
        this.color = color || "silver";

    }
}
// A constructor for defining new trucks
class Truck {
    constructor({
        state,
        wheelSize,
        color
    }) {

        this.state = state || "used";
        this.wheelSize = wheelSize || "large";
        this.color = color || "blue";
    }
}

// FactoryExample.js

// Define a vehicle factory
class VehicleFactory {
    // Define the prototypes and utilities for this factory

    // Our default vehicleClass is Car
    constructor() {
        this.vehicleClass = Car;
    }
    // Our Factory method for creating new Vehicle instances
    createVehicle(options) {

        switch (options.vehicleType) {
            case "car":
                this.vehicleClass = Car;
                break;
            case "truck":
                this.vehicleClass = Truck;
                break;
                //defaults to VehicleFactory.prototype.vehicleClass (Car)
        }

        return new this.vehicleClass(options);

    }
}

// Create an instance of our factory that makes cars
const carFactory = new VehicleFactory();
const car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const movingTruck = carFactory.createVehicle({
    vehicleType: "truck",
    state: "like new",
    color: "red",
    wheelSize: "small"
});

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
console.log(movingTruck instanceof Truck);

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log(movingTruck);

//********************** Snippet 3 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] The extends keyword is used to create a class which is a child of another class.
// [ES2015+] We have new pattern implementation with new inheritance
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] A constructor can use the super keyword to call the constructor of the super class.
class TruckFactory extends VehicleFactory {
    constructor() {
        super()
        this.vehicleClass = Truck;
    }
}
const truckFactory = new TruckFactory();
const myBigTruck = truckFactory.createVehicle({
    state: "omg..so bad.",
    color: "pink",
    wheelSize: "so big"
});

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log(myBigTruck instanceof Truck);

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log(myBigTruck);

//*******************************************************//
// Abstract Factories
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] The static keyword defines a static method for a class. 
// [ES2015+] Static methods are called without instantiating their class and cannot be called through a class instance. 
// [ES2015+] Static methods are often used to create utility functions for an application.
// [ES2015+] We used new keyword const for immutable constant declaration

class AbstractVehicleFactory {
    constructor() {
         // Storage for our vehicle types
        this.types = {};
    }

    static getVehicle(type, customizations) {
        const Vehicle = this.types[type];

        return (Vehicle ? new Vehicle(customizations) : null);
    }

    static registerVehicle(type, Vehicle) {
        const proto = Vehicle.prototype;

        // only register classes that fulfill the vehicle contract
        if (proto.drive && proto.breakDown) {
            this.types[type] = Vehicle;
        }

        return abstractVehicleFactory;
    }
}

// Usage:

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
const car = abstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// Instantiate a new truck in a similar manner
const truck = abstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});
