var mysqlManager = require('../utils/mysqlManager');


exports.executeQuery = function(queryText, next) {
    

	mysqlManager.executeQuery(queryText, next);


};


exports.update = function(instanceId, next) {


	var queryText = "CREATE DATABASE " + instanceId;
    
	mysqlManager.executeQuery(queryText, next);


};