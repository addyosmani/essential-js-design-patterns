//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new arrow function syntax

(() => {
    const carManager = {
        // request information
        requestInfo(model, id) {
            return `The information for ${model} with ID ${id} is foobar`;
        },

        // purchase the car
        buyVehicle(model, id) {
            return `You have successfully purchased Item ${id}, a ${model}`;
        },

        // arrange a viewing
        arrangeViewing(model, id) {
            return `You have successfully booked a viewing of ${model} ( ${id} ) `;
        },
    };
})();

//********************** Snippet 2 **********************//

carManager.execute('buyVehicle', 'Ford Escort', '453543');

//********************** Snippet 3 **********************//

carManager.execute = function(name) {
    return (
        carManager[name] &&
        carManager[name].apply(carManager, [].slice.call(arguments, 1))
    );
};

//********************** Snippet 4 **********************//

carManager.execute('arrangeViewing', 'Ferrari', '14523');
carManager.execute('requestInfo', 'Ford Mondeo', '54323');
carManager.execute('requestInfo', 'Ford Escort', '34232');
carManager.execute('buyVehicle', 'Ford Escort', '34232');
