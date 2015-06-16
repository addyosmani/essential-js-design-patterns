describe("7 essential javascript functions", function () {
    it("debounce", function (done) {
        //expect(jasmine.DEFAULT_TIMEOUT_INTERVAL).toEqual(5000)
        var i = 0
        var myEfficientFn = debounce(function () {
            // All the taxing stuff you do
            clearInterval(interval)
            expect(i).toBeLessThan(2)
            done()
        }, 250, true);
        var interval = setInterval(myEfficientFn, 100)
    });
    it('poll', function (done) {
        var isEnd = false
        // Usage:  ensure element is visible
        poll(
            function () {
                var offset = $('#lightbox').offset();
                return offset ? offset.width > 0 : false;
            },
            function () {
                if (isEnd) {
                    expect(true).toBeTruthy()
                    done()
                }
                // Done, success callback
            },
            function () {
                if (isEnd) {
                    expect(false).toBeFalsy()
                    done()
                }
                // Error, failure callback
            }
        );
        setTimeout(function () {
            isEnd = true
        }, 1000)
    })
    it("once", function () {
        var i=0
        var obj={}
        obj.canOnlyFireOnce = once(function() {
            expect(true).toBeTruthy()
            i++
            console.log('Fired!');
        });
        obj.canOnlyFireOnce();
        obj.canOnlyFireOnce();
        expect(i).toEqual(1)

    });
});