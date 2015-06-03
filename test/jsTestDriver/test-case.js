GreeterTest = TestCase("GreeterTest");
GreeterTest.prototype.testGreet = function () {
    var greeter = myModule.saySomething();
// Outputs: Caching is: enabled
    myModule.reportMyConfig();
// Outputs: fr
    myModule.updateMyConfig({
        language: "fr",
        useCaching: false
    });
// Outputs: Caching is: disabled
    myModule.reportMyConfig();
    assertEquals('Where in the world is Paul Irish today?', greeter);
};