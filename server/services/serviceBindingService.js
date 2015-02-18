var Q = require("q");
var mysqlManager = require('../utils/mysqlManager');

var userExists = function (userName) {

	var d = Q.defer();

	var queryText = "SELECT * FROM mysql.user WHERE user like '" + userName + "'";
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			console.log(result);
			if (result.length != 0)
			{
				d.resolve(userName);	
			}
			else
			{
				d.reject(new Error("User does not exist!"));
			}
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

var bindExists = function (binding) {

	var d = Q.defer();

	var queryText = "SELECT 'db', User FROM mysql.db WHERE db='" + instanceId + "' and User='" + userName + "'";

	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			console.log(result);
			if (result.length == 0)
			{
				d.resolve(binding);	
			}
			else
			{
				d.reject(new Error("Already exists!"));
			}
			
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};


var createUser = function (binding) {

	var d = Q.defer();

	binding["password"] = "password";

	var queryText = "CREATE USER '" + binding.username + "' IDENTIFIED BY '" + binding.password + "'" ;
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			d.resolve(binding);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

var grantPrivilege = function (binding) {

	var d = Q.defer();

	var queryText = "GRANT ALL PRIVILEGES ON `" + binding.schema + "`.* TO '" + binding.username + "'@'%'" ;
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			d.resolve(binding);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

var flushPrivilege = function (binding) {

	var d = Q.defer();

	var queryText = "FLUSH PRIVILEGES";
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(binding){
			d.resolve(binding);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

var dropUser = function (userName) {

	var d = Q.defer();

	var queryText = "DROP USER '" + userName + "'";
	console.log("queryText: " + queryText);

	mysqlManager.executeQuery(queryText)
		.then(function(result){
			d.resolve();
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;

};

exports.save = function(instanceId, username) {

	var varBinding = {schema: instanceId, username: username};

	bindExists(varBinding)
		.then(createUser)
		.then(grantPrivilege)
		.then(flushPrivilege)
		.then(function (binding){
			var url = "mysq://" + username + ":" + binding.password + "@" + process.env.host + ":" + process.env.port + "/" + instanceId;
			var result = {credentials: url};
			d.resolve(result);
		})
		.catch(function(error){
    		d.reject(error);
		});
};


exports.destroy = function(userName) {

	var d = Q.defer();

	userExists(userName)
		.then(dropUser)
		.then(function(result){
			d.resolve(result);
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;
};