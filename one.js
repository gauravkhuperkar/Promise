// Demo promise

var mypromise = new Promise(function(resolve, reject){
 // asynchronous code to run here
 // call resolve() to indicate task successfully completed
 // call reject() to indicate task has failed 
})

//--------------------------------------------------------------------------------

var fs = require('fs');
var request = require('request');


var getImage = function(){
	var err;
	var statusCode;
	var body;

    var promise = new Promise(function(resolve, reject){
		request('http://www.google.com', function (error, response, body) {
		  	err = error;
	  		statusCode = response
	  		body = body;
		})

		resolve()
		reject()
	});
    
    return promise;

}

getImage().then(function() {
	console.log("resolved")
})