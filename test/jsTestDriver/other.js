function observeMethod() {
// Let's say we have a model with data
    var model = {};
// Which we then observe
    var observe = Object.observe;
    if (observe instanceof Function) {
        observe(model, function (changes) {

            // This asynchronous callback runs
            changes.forEach(function (change) {

                // Letting us know what changed
                console.log(change.type, change.name, change.oldValue);
            });
        });
        return true
    }
}



