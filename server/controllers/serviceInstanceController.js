var service = require('../services/serviceInstanceService.js');
 


exports.update = function(req, res) {
    console.log("req.params.instance_id:");
    console.log(req.params.instance_id);
    service.create(req.params.instance_id, function (err, result) {

    	console.log("result:" + JSON.stringify(result));
    	res.set('Content-Type', 'application/json');
    	res.send("{}");
    });

};

exports.destroy = function(req, res) {
    console.log("req.params.instance_id:");
    console.log(req.params.instance_id);

    service.delete(req.params.instance_id, function (err, result) {

        console.log("result:" + JSON.stringify(result));
        res.set('Content-Type', 'application/json');
        res.send("{}");
    });

};
