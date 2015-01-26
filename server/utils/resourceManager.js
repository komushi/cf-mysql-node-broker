var yaml = require("js-yaml");
var fs = require("fs");


exports.getResource = function(resourcePath, next) {
    
    var resx;
    var jsonString;
    var error = null;

	try {
	    // the synchronous code that we want to catch thrown errors on
	    resx = yaml.load(fs.readFileSync(resourcePath));
	    jsonString = JSON.stringify(resx);
	} 
	catch (err) {
	    // handle the error safely
	    console.log(err);
	    error = err;
	    
	}
	
    return next(error, jsonString);
};
