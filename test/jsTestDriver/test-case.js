ObjectModule = TestCase("GreeterTest");
ObjectModule.prototype.testGreet = function () {
    var say1 = myModule.saySomething();
    var say2=myModule.reportMyConfig();
    var say3=myModule.updateMyConfig({
        language: "fr",
        useCaching: false
    });
    var say4=myModule.reportMyConfig();
    assertEquals('Where in the world is Paul Irish today?', say1);
    assertEquals('Caching is: enabled',say2)
    assertEquals('fr',say3)
    assertEquals('Caching is: disabled',say4)
    assertEquals(myModule,myModule.retThis())
};