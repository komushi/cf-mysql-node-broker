var mysqlManager = require('../utils/mysqlManager');


var schemaExists = function (instanceId, next) {

	var queryText = "SHOW SCHEMAS LIKE '" + instanceId + "'";

	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText, function(error, result) {
		return next(error, (result > 0));
	});

};


exports.create = function(instanceId, next) {


	schemaExists(instanceId, function(error, exists){
		if (!error)
		{
			var queryText = "CREATE SCHEMA " + instanceId;

			console.log("queryText: " + queryText);

			mysqlManager.executeQuery(queryText, next);
		}
	});
};

exports.delete = function(instanceId, next) {


	var queryText = "DROP SCHEMA IF EXISTS " + instanceId ;
    
	mysqlManager.executeQuery(queryText, next);


};