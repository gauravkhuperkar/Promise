// trying simple reject scenario

var promiseToEligibleForVoating = new Promise(function(resolve, reject) {
    var isEligible = false;
    if(isEligible) {
        resolve("Eligible")
    } else {
        reject("Not Eligible")
    }
});


promiseToEligibleForVoating.catch(
    function (errMsg) {
        console.log("User is ",errMsg)
    }
);

// chain promise ---------------------------------------------------------------

var firstMethod = function() {
    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('first method completed');
            resolve({txt: "data"});
        }, 2000);
    });
    return promise;
};


var secondMethod = function(someStuff) {

    console.log('second method completed', someStuff);
    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve({newData: someStuff.data + ' some more data'});
        }, 2000);
    });
    return promise;
};

var thirdMethod = function(someStuff) {
    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('third method completed ',someStuff);
            resolve({result: someStuff.newData});
        }, 2000);
    });
    return promise;
};

var fourthMethod = function(someStuff) {
    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('fourthMethod method completed ',someStuff);
            resolve({result: someStuff.newData});
        }, 2000);
    });
    return promise;
};


firstMethod()
    .then(secondMethod)
    .then(thirdMethod)
    .then(fourthMethod);


