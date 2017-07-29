QUnit.test("ObjectTest", function (assert) {

    var say1 = myModule.saySomething();
    var say2 = myModule.reportMyConfig();
    var say3 = myModule.updateMyConfig({
        language: "fr",
        useCaching: false
    });
    var say4 = myModule.reportMyConfig();
    assert.equal('Where in the world is Paul Irish today?', say1);
    assert.equal('Caching is: enabled', say2)
    assert.equal('fr', say3)
    assert.equal('Caching is: disabled', say4)
    assert.equal(myModule, myModule.retThis())
});
QUnit.test('ClosureModuleTest', function (assert) {

    assert.ok(modulePattern instanceof Object)
    var newCounter = modulePattern.incrementCounter();
    var newCounter1 = modulePattern.resetCounter();
    assert.equal(1, newCounter);
    assert.equal('counter value prior to reset: 0', newCounter1)
    var counter = Infinity
    assert.equal(Infinity, counter)
    //variable in object accessed firstly
    assert.notEqual(Infinity, modulePattern.getCounter())
})
//observer pattern by ES6
// see observer.js