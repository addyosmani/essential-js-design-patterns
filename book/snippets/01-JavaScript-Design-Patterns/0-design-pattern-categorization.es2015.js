//*******************************************************//
// A brief note on classes
//*******************************************************//

// Section contains description of ES2015, but not use it.
// I suggest remove the description and put the new examples.

//********************** Snippet 1 **********************//

// A car "class"

// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new template literals for string interpolation
class Car {
    constructor(model) {
        this.model = model;
        this.color = 'silver';
        this.year = '2012';
    }

    getInfo() {
        return `${this.model} ${this.year}`;
    }
}

//********************** Snippet 2 **********************//

// Usage:

// [ES2015+] We used new keyword const for immutable constant declaration
const myCar = new Car('ford');

myCar.year = '2010';

console.log(myCar.getInfo());

// Here the link on Stoyan Stefanov's post, it's a good post.
// But more modern data can be obtained here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
