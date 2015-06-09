ObjectModule = TestCase("ObjectTest");
ObjectModule.prototype.test = function () {
    var say1 = myModule.saySomething();
    var say2 = myModule.reportMyConfig();
    var say3 = myModule.updateMyConfig({
        language: "fr",
        useCaching: false
    });
    var say4 = myModule.reportMyConfig();
    assertEquals('Where in the world is Paul Irish today?', say1);
    assertEquals('Caching is: enabled', say2)
    assertEquals('fr', say3)
    assertEquals('Caching is: disabled', say4)
    assertEquals(myModule, myModule.retThis())
};
ClosureModule = TestCase("ClosureModuleTest");
ClosureModule.prototype.test = function () {
    var newCounter = modulePattern.incrementCounter();
    var newCounter1 = modulePattern.resetCounter();
    assertEquals(1, newCounter);
    assertEquals('counter value prior to reset: 0', newCounter1)
    var counter = Infinity
    assertEquals(Infinity, counter)
    //variable in object accessed firstly
    assertNotEquals(Infinity, modulePattern.getCounter())
};
//observer pattern by ES6
ObserveModule = TestCase("ObserveTest");
ObserveModule.prototype.test = function () {
    var obj = {};
    var obj1 = observeMethod(obj, function (data) {
        assertEquals({},data)
    });
    obj.a = 'a'
    //asynchronous
    assertUndefined(obj1)
    assertTrue($.isEmptyObject(obj1))
    //assertEquals('',obj.type)
    //change.type, change.name, change.oldValue
};