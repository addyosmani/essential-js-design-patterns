/* global describe, it */

(function () {
    'use strict';

    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it("ObjectTest", function () {
                expect(true).toBe(true);
                var say1 = myModule.saySomething();
                var say2 = myModule.reportMyConfig();
                var say3 = myModule.updateMyConfig({
                    language: "fr",
                    useCaching: false
                });
                var say4 = myModule.reportMyConfig();
                expect('Where in the world is Paul Irish today?').toEqual(say1);
                expect('Caching is: enabled').toEqual(say2);
                expect('fr').toEqual(say3);
                expect('Caching is: disabled').toEqual(say4);
                expect(myModule).toEqual(myModule.retThis());
            });
            it('ClosureModuleTest', function () {
                expect(modulePattern instanceof Object).toBeTruthy()
                var newCounter = modulePattern.incrementCounter();
                var newCounter1 = modulePattern.resetCounter();
                expect(1).toEqual(newCounter);
                expect('counter value prior to reset: 0').toEqual(newCounter1);
                var counter = Infinity
                expect(Infinity).toEqual(counter);
                //variable in object accessed firstly
                expect(Infinity).not.toEqual(modulePattern.getCounter())
            })
//observer pattern by ES6
// see observer.js
        });
    });
})();
