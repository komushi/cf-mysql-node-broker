var Q = require('q');
var service = require('../services/serviceInstanceService');

exports.create = function(req, res) {
    console.log("req.params.instance_id:" + req.params.instance_id);

    service.create(req.params.instance_id)
        .then(function(result){
            console.log('result:' + JSON.stringify(result));
            res.set('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function(error){
            console.log("controller error:");
            console.log(error.stack);
            res.set('Content-Type', 'application/json');
            res.status(error.http_code);
            res.send(error.message);
        })
        .done();
};

exports.delete = function(req, res) {
    console.log("req.params.instance_id:" + req.params.instance_id);

    service.delete(req.params.instance_id)
        .then(function(result){
            console.log('result:' + JSON.stringify(result));
            res.set('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function(error){
            console.log("controller error:");
            console.log(error.stack);
            res.set('Content-Type', 'application/json');
            res.status(error.http_code);
            res.send(error.message);
        })
        .done();
};
