var resourceManager = require('../utils/resourceManager');
 
exports.getCatalog = function(req, res) {

    resourceManager.getResource("./resources/settings.yml", function (err, jsonString) {

    	res.set('Content-Type', 'application/json');
    	res.send(jsonString);
    });

};

