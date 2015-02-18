var Q = require("q");
var mysqlManager = require('../utils/mysqlManager');

/**
 * To check whether a schema exists
 * @param  {string}   instanceId id of the instance
 * @param  {Function} next       callback function
 * @return {[type]}              callback function
 */
var schemaExists = function (instanceId, expectExists) {

	var d = Q.defer();

	var queryText = "SHOW SCHEMAS LIKE '" + instanceId + "'";
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			if (expectExists)
			{
				if (result.length != 0)
				{
					d.resolve(instanceId);
				}
				else
				{
					d.reject(new Error("Schema does not exist!"));
				}
			}
			else
			{
				if (result.length == 0)
				{
					d.resolve(instanceId);
				}
				else
				{
					d.reject(new Error("Schema already exists!"));
				}
			}
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

var createSchema = function (instanceId) {

	var d = Q.defer();

	// var queryText = "CREATE SCHEMA " + instanceId + " CHARACTER SET utf8 COLLATE utf8_bin";
	var queryText = "CREATE SCHEMA " + instanceId;

	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function (result) {
			console.log(result);
			d.resolve();
		})
		.catch(function(error){
			console.error(error);
    		d.reject(error);
		});

	return d.promise;

};

var dropSchema = function (instanceId) {

	var d = Q.defer();

	var queryText = "DROP SCHEMA IF EXISTS " + instanceId ;

	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function (result) {
			d.resolve();
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};


exports.create = function(instanceId, next) {

	var d = Q.defer();

	schemaExists(instanceId, false)
		.then(createSchema)
		.then(function(result){
			d.resolve(result);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;
};

exports.delete = function(instanceId) {

	var d = Q.defer();

	schemaExists(instanceId, true)
		.then(dropSchema)
		.then(function(result){
			d.resolve(result);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;
};