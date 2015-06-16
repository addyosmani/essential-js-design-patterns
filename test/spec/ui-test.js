describe("Suite", function () {
    var value;
    beforeEach(function (done) {
        setTimeout(function () {
            value = 0;
            done();
        }, 1);
    });
    it("should support async execution of test preparation and expectations", function (done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });
    //var i = 0;
    //beforeEach(function (done) {
    //    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    //    //window.addEventListener('resize', myEfficientFn);
    //});
    it("UI functions", function (done) {
        //expect(jasmine.DEFAULT_TIMEOUT_INTERVAL).toEqual(5000)
        var i=0
        var myEfficientFn = debounce(function () {
            // All the taxing stuff you do
            clearInterval(interval)
            expect(i).toBeLessThan(2)
            done()
        }, 250, true);
        var interval = setInterval(myEfficientFn, 100)
    });
});