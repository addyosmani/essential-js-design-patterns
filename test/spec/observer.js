//observer pattern by ES6
QUnit.test("Observer test", function (assert) {
    var obj = {}, obj1 = null, obj2 = null;
    var obj1 = observeMethod(obj, function (data) {
        obj2 = data
        assert.notOk($.isEmptyObject(obj2))
        assert.equal('add', obj2.type)
        assert.equal('a', obj2.name)
        assert.equal(undefined, obj2.oldValue)

        //change.type, change.name, change.oldValue
        done()
    });
    obj.a = 'a'
    var done = assert.async()
    //not ret val
    assert.equal(undefined, obj1)
    //asynchronous
    assert.equal(null, obj2)
});