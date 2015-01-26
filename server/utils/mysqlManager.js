
/**
 * Your utility library for express
 */


var mysql = require('mysql');
var resourceManager = require('../utils/resourceManager.js');


var createPool  = function (next)
{
    resourceManager.getResource("./resources/mysql.yml", function (err, jsonString) {

    	var mysqlPool;
    	var error = null;
    	if (!err && jsonString)
    	{
    		var jsonObj = JSON.parse(jsonString);
	    	mysqlPool = mysql.createPool({
			  host     : jsonObj.host,
			  port     : jsonObj.port,
			  user     : jsonObj.user,
			  password : jsonObj.password
			});
    	}
    	else
    	{
    		console.log(err);
    		error = err;
    	}
    	
    	return next(error, mysqlPool);

    });

};

var getConnection  = function (pool, next)
{

	pool.getConnection(function (err, connection) {

		var mysqlConn;
		var error = null;

    	if (!err && connection)
    	{
    		mysqlConn = connection;
    	}
    	else
    	{
    		console.log(err);
    		error = err;
    	}

    	return next(error, mysqlConn);

	});

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
exports.executeQuery = function(queryText, next){

	
	createPool(function (err, pool) {

    	if (err)
    	{
    		return next(err, null);
    	}

		getConnection(pool, function(err, connection) {

	    	if (err)
	    	{
	    		return next(err, null);
	    	}



			// Use the connection
			connection.query(queryText, function(err, rows) {

				var error = null;
				var result;

				// And done with the connection.
				connection.release();

		    	if (!err && rows)
		    	{
		    		result = rows;
		    	}
		    	else
		    	{
		    		console.log(err);
		    		error = err;
		    	}

				result = rows;

				return next(error, result);
			});
		});
    	

	});

	
};
