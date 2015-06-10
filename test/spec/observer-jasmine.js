//observer pattern by ES6
describe('observe test', function () {
    it("Observer test", function (done) {
        var obj = {}, obj1 = null, obj2 = null;
        obj1 = observeMethod(obj, function (data) {
            obj2 = data
            expect($.isEmptyObject(obj2)).not.toBeTruthy()
            expect('add').toEqual(obj2.type);
            expect('a').toEqual(obj2.name);
            expect(undefined).toEqual(obj2.oldValue);
            //change.type, change.name, change.oldValue
            done()
        });
        obj.a = 'a'
        //not ret val
        expect(undefined).toEqual(obj1);
        //asynchronous
        expect(null).toEqual(obj2);
    });
})
