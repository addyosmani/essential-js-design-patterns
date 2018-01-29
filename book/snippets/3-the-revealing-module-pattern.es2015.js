//********************** Snippet 1 **********************//
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax
// [ES2015+] We have new pattern implementation with new keywords import and export

let privateVar = "Ben Cherry";
const publicVar = "Hey there!";

const privateFunction = () => {
    console.log(`Name:${privateVar}`);
}

// [ES2015+] Parentheses are optional when there's only one parameter name:
const publicSetName = strName => {
    privateVar = strName;
}

const publicGetName = () => {
    privateFunction();
}


// Reveal public pointers to
// private functions and properties
const myRevealingModule = {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
};

// [ES2015+] Default export module, without name
export default myRevealingModule;

// Usage:
// [ES2015+] The import statement is used to import bindings which are exported by another module.
import myRevealingModule from './myRevealingModule';

myRevealingModule.setName("Paul Kinlan");

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax
// [ES2015+] We have new pattern implementation with new keywords import and export

let privateCounter = 0;

const privateFunction = () => {
    privateCounter++;
}

const publicFunction = () => {
    publicIncrement();
}

const publicIncrement = () => {
    privateFunction();
}

// [ES2015+] Equivalent to: => { return privateCounter; } 
const publicGetCount = () => privateCounter;

// Reveal public pointers to
// private functions and properties
const myRevealingModule = {
    start: publicFunction,
    increment: publicIncrement,
    count: publicGetCount
};

// [ES2015+] Default export module, without name
export default myRevealingModule;

// Usage:
// [ES2015+] The import statement is used to import bindings which are exported by another module.
import myRevealingModule from './myRevealingModule';

myRevealingModule.start();
