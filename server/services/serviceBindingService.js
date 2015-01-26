var mysqlManager = require('../utils/mysqlManager');

exports.save = function(binding, next) {

	var queryText;
	queryText = "CREATE USER '" + binding.username + "' IDENTIFIED BY '" + binding.username + "'" ;
    
	mysqlManager.executeQuery(queryText, function(error, result) {
		console.log("queryText: " + queryText);
		console.log("result: " + result);
		if (!error)
		{
			queryText = "GRANT ALL PRIVILEGES ON `" + binding.schema + "`.* TO '" + binding.username + "'@'%'" ;

			mysqlManager.executeQuery(queryText, function(error, result) {
				console.log("queryText: " + queryText);
				console.log("result: " + result);
				if (!error)
				{
					queryText = "FLUSH PRIVILEGES";

					mysqlManager.executeQuery(queryText, next);

				}
			});
		}
	});
};

exports.destroy = function(instanceId, next) {


	var queryText = "DROP USER '" + binding.username + "'";
    
	mysqlManager.executeQuery(queryText, next);


};