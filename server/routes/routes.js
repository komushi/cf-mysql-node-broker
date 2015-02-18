var express=require('express');
var catalogController = require('../controllers/catalogController');
var serviceInstanceController = require('../controllers/serviceInstanceController');
var serviceBindingController = require('../controllers/serviceBindingController');

//configure routes
var router = express.Router();

/**************************/
/* REST API hello */
router.route('/v2')
  .get(function (req, res) {
   res.send('REST API is running.');
   console.log("REST API is running.");
});
/* REST API hello */
/**************************/

/**************************/
/* REST API /v2/catalog */
router.route('/v2/catalog')
  .get(function (req, res) {
  	console.log("Begin: /v2/catalog");

  	catalogController.getCatalog(req, res);

  	console.log("End: /v2/catalog");
});

/* REST API getCountByCat */
/**************************/

/**************************/
/* REST API /v2/service_instances/:instance_id */
router.route('/v2/service_instances/:instance_id')
  .put(function (req, res) {
  	console.log("Begin: put /v2/service_instances/:instance_id");

  	serviceInstanceController.update(req, res);

  	console.log("End: put /v2/service_instances/:instance_id");
})
  .delete(function (req, res) {
    console.log("Begin: delete /v2/service_instances/:instance_id");

    serviceInstanceController.destroy(req, res);

    console.log("End: delete /v2/service_instances/:instance_id");
});
/* REST API /v2/service_instances/:instance_id */
/**************************/

/**************************/
/* REST API /v2/service_instances/:instance_id/service_bindings/:binding_id */
router.route('/v2/service_instances/:instance_id/service_bindings/:binding_id')
  .put(function (req, res) {
    console.log("Begin: put /v2/service_instances/:instance_id/service_bindings/:binding_id");

    serviceBindingController.update(req, res);

    console.log("End: put /v2/service_instances/:instance_id/service_bindings/:binding_id");
})
  .delete(function (req, res) {
    console.log("Begin: delete /v2/service_instances/:instance_id/service_bindings/:binding_id");

    serviceBindingController.destroy(req, res);

    console.log("End: delete /v2/service_instances/:instance_id/service_bindings/:binding_id");
});
/* REST API /v2/service_instances/:instance_id */
/**************************/

module.exports=router;