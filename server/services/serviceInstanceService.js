var Q = require("q");
var mysqlManager = require('../utils/mysqlManager');

/**
 * To check whether a schema exists
 * @param  {string}   instanceId id of the instance
 * @param  {Function} next       callback function
 * @return {[type]}              callback function
 */
var schemaExists = function (instanceId) {

	var d = Q.defer();

	var queryText = "SHOW SCHEMAS LIKE '" + instanceId + "'";
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			d.resolve(result.length > 0);
		})
		.catch(function(error){
    		// console.log("schemaExists error!!");
    		// console.log(error);
    		// d.reject(new Error(error));
    		d.reject(error);
		});

	return d.promise;

};


exports.create = function(instanceId, next) {

	var d = Q.defer();

	schemaExists(instanceId)
		.then(function (exists){
			if (!exists){
				var queryText = "CREATE SCHEMA " + instanceId;

				console.log("queryText: " + queryText);

				mysqlManager.executeQuery(queryText)
					.then(function (result) {

						d.resolve(200);
					});
			}
			else
			{
				d.resolve(201);
			}

		})
		.catch(function(error){
    		// console.log("create error!!");
    		// console.log(error);
    		// d.reject(new Error(error));
    		d.reject(error);
		});

	return d.promise;
};

exports.delete = function(instanceId) {


	var d = Q.defer();

	schemaExists(instanceId)
		.then(function (exists){
			if (exists){
				var queryText = "DROP SCHEMA IF EXISTS " + instanceId ;

				console.log("queryText: " + queryText);

				mysqlManager.executeQuery(queryText)
					.then(function (result) {

						d.resolve(200);
					});
			}
			else
			{
				d.resolve(410);
			}

		})
		.catch(function(error){
    		// console.log("delete error!!");
    		// console.log(error);
    		// d.reject(new Error(error));
    		d.reject(error);
		});

	return d.promise;



};