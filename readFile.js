var fs = require('fs');

//simple function reading text
var textFile = "./text.txt";

var read = function(fileName) {
	return fs.readFileSync(fileName, "utf8");
}

// now function will take callback
var readWithCallback = function(fileName, callback) {
	return fs.readFile(fileName, "utf8", function(err, res){
		if (err) return callback(err);
		callback(null, res)
	});
}

var printMsg = function(err, msg) {
	console.log(msg)
}

readWithCallback(textFile, printMsg);