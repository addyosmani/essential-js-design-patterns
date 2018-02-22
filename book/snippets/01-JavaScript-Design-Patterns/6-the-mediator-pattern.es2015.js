//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

const mediator = {};

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

const orgChart = {
    addNewEmployee() {
        // getEmployeeDetail provides a view that users interact with
        const employeeDetail = this.getEmployeeDetail();

        // when the employee detail is complete, the mediator (the 'orgchart' object)
        // decides what should happen next
        // [ES2015+] Parentheses are optional when there is only one parameter
        employeeDetail.on('complete', employee => {
            // set up additional objects that have additional events, which are used
            // by the mediator to do additional things
            // [ES2015+] Parentheses are optional when there is only one parameter
            const managerSelector = this.selectManager(employee);
            managerSelector.on('save', employee => {
                employee.save();
            });
        });
    },

    // ...
};

//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance
// [ES2015+] We used new template literals for string interpolation

const MenuItem = MyFrameworkView.extend({
    events: {
        'click .thatThing': 'clickedIt',
    },

    clickedIt(e) {
        e.preventDefault();

        // assume this triggers "menu:click:foo"
        MyFramework.trigger(`menu:click:${this.model.get('name')}`);
    },
});

// ... somewhere else in the app

class MyWorkflow {
    constructor() {
        MyFramework.on('menu:click:foo', this.doStuff, this);
    }

    // [ES2015+] The static keyword defines a static method for a class.
    // [ES2015+] Static methods are called without instantiating their class and cannot be called through a class instance.
    // [ES2015+] Static methods are often used to create utility functions for an application.
    static doStuff() {
        // instantiate multiple objects here.
        // set up event handlers for those objects.
        // coordinate all of the objects into a meaningful workflow.
    }
}
