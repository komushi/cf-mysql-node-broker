var express=require('express');
var catalogController = require('../controllers/catalogController');
var serviceInstanceController = require('../controllers/serviceInstanceController');

//configure routes

var router=express.Router();

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
/* REST API /v2/catalog */
router.route('/v2/service_instances/:instance_id')
  .put(function (req, res) {
  	console.log("Begin: /v2/service_instances/:instance_id");

  	serviceInstanceController.getMySQL(req, res);

  	console.log("End: /v2/service_instances/:instance_id");
});

/* REST API getCountByCat */
/**************************/

module.exports=router;