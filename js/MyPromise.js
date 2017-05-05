const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function MyPromise() {
    var state = PENDING;
    var value = null;
    var handlers = [];
    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function resolve(result) {
        try {
            var then = reduceThen(result);
            if (then) {
                resolver(then.bind(result), resolve, reject)
            }
            fulfill(result)

        } catch (e) {
            reject(e)
        }
    }
    
    function handle(handler) {
        if (state === FULFILLED)
            handler.onFulfilled(value);
        if (state === REJECTED)
            handlers.onRejcted(value);
        if (state === PENDING)
            handlers.push(handler);
    }
    
    function done(onFulfilled, onRejected) {
        handle({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        })
    }
}

function reduceThen(value) {
    if (typeof value === "object")
        if (typeof value.then === 'function')
            return value.then;
    return null;
}

function resolver(fn, onFulfilled, onRejected) {
    var done = false;
    try {
        fn(function (value) {
            if (done) return;
            done = true;
            onFulfilled(value)
        }, function (reason) {
            if (done) return;
            done = true;
            onRejected(reason)
        })
    } catch (e) {
        if(done) return;
        done = true;
        onRejected(e);
    }
}