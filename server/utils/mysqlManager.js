
/**
 * Your utility library for express
 */


var Q = require("q");
var mysql = require("mysql");
var resourceManager = require('../utils/resourceManager.js');

var createPool  = function ()
{
	var d = Q.defer();

    resourceManager.getResource("./resources/mysql.yml", function (err, jsonString) {

    	var mysqlPool;
    	
    	if (!err && jsonString)
    	{
    		var jsonObj = JSON.parse(jsonString);
	    	mysqlPool = mysql.createPool({
			  host     : jsonObj.host,
			  port     : jsonObj.port,
			  user     : jsonObj.user,
			  password : jsonObj.password
			});
			d.resolve(mysqlPool);
    	}
    	else
    	{
    		console.log(err);
    		d.reject(new Error(err));
    	}

    });

    return d.promise;

};

var getConnection  = function (pool)
{
	var d = Q.defer();

	pool.getConnection(function (err, connection) {

    	if (!err && connection)
    	{
    		d.resolve(connection);
    	}
    	else
    	{
    		console.log(err);
    		d.reject(new Error(err));
    	}

	});

	return d.promise;

};

var doQuery  = function (connection, queryText)
{
	var d = Q.defer();

	// Use the connection
	connection.query(queryText, function(err, rows) {

		// And done with the connection.
		connection.release();

    	if (!err && rows)
    	{
    		d.resolve(rows);
    	}
    	else
    	{
    		console.log(err);
    		d.reject(new Error(err));
    	}
	});

	return d.promise;

};

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * mgr.execute('select 1 as field1', function (error, result){});
 *
 * @param   {string}   queryText
 * @returns {function} 
 */
exports.executeQuery = function(queryText){

	var d = Q.defer();

	createPool()
		.then(getConnection)
		.then(function(connection) {
			return doQuery(connection, queryText);
		})
		.then(function(result) {
			// console.log("executeQuery result: " + JSON.stringify(result));
			d.resolve(result);
		});

	return d.promise;
	
};
