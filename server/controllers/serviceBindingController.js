var Q = require('q');
var service = require('../services/serviceBindingService');

exports.save = function(req, res) {
    console.log("req.params.instance_id:" + req.params.instance_id);
    console.log("req.params.binding_id:" + req.params.binding_id);

    service.save(req.params.instance_id, req.params.binding_id)
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
            res.status(409);
            res.send(JSON.stringify(error));
        })
        .done();
};

exports.destroy = function(req, res) {
    console.log("req.params.binding_id:" + req.params.binding_id);

    service.destroy(req.params.binding_id)
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
            res.status(410);
            res.send(JSON.stringify(error));
        })
        .done();
};
