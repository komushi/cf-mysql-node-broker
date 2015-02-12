var Q = require('q');
var service = require('../services/serviceInstanceService.js');

exports.update = function(req, res) {
    console.log("req.params.instance_id:" + req.params.instance_id);

    service.create(req.params.instance_id)
        .then(function(result){
            console.log('result:' + JSON.stringify(result));
            res.set('Content-Type', 'application/json');
            res.status(result);
            res.send("{}");
        })
        .catch(function(error){
            console.log("controller error:");
            console.log(error.stack);
            res.set('Content-Type', 'application/json');
            res.status(403);
            res.send(JSON.stringify(error));
        })
        .done();
};

exports.destroy = function(req, res) {
    console.log("req.params.instance_id:" + req.params.instance_id);

    service.delete(req.params.instance_id)
        .then(function(result){
            console.log('result:' + JSON.stringify(result));
            res.set('Content-Type', 'application/json');
            res.status(result);
            res.send("{}");
        })
        .catch(function(error){
            console.log("controller error:");
            console.log(error.stack);
            res.set('Content-Type', 'application/json');
            res.status(403);
            res.send(JSON.stringify(error));
        })
        .done();
};
