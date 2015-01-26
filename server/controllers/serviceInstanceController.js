var service = require('../services/serviceInstanceService.js');
 
exports.getMySQL = function(req, res) {
    service.executeQuery("select 1 + 1 as result", function (err, result) {

    	console.log("result:" + JSON.stringify(result));
    	res.set('Content-Type', 'application/json');
    	res.send(result);
    });

};


exports.create = function(req, res) {
    service.update(req.params.id, function (err, result) {

    	console.log("result:" + JSON.stringify(result));
    	res.set('Content-Type', 'application/json');
    	res.send(result);
    });

};
