function observeMethod(obj,callback) {
// Let's say we have a model with data
    var model = obj;
// Which we then observe
    var observe = Object.observe;
    if (observe instanceof Function) {
        observe(model, function (changes) {

            // This asynchronous callback runs
            changes.forEach(function (change) {
                callback(change)
            });
        });
    }
}



