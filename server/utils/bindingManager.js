var crypto = require('crypto');


exports.generateBinding = function(instanceId, bindingId) {

	var md5hex = crypto.createHash('md5').update(bindingId).digest("hex");

	return {schema: instanceId, username: md5hex.substr(0, 16), password: md5hex.substr(15, 16)};

};
