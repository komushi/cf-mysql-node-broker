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

	var queryText = "SELECT 'db', User FROM mysql.db WHERE db='" + binding.schema + "' and User='" + binding.username + "'";

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
		.then(function(result){
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

var createCredentials = function (binding) {

	var credentials;

	var uri = "mysql://" + binding.username + ":" + binding.password + "@" + process.env.host + ":" + process.env.port + "/" + binding.schema;

	credentials = 
		{
			credentials : 
				{
					uri: uri,
					username: binding.username,
					password: binding.password,
					host: process.env.host,
					port: process.env.port,
					database: binding.schema
				}
		};

	return credentials

};

exports.save = function(binding) {

	var d = Q.defer();

	bindExists(binding)
		.then(createUser)
		.then(grantPrivilege)
		.then(flushPrivilege)
		.then(function (resultBinding){
			d.resolve(createCredentials(resultBinding));
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;
};


exports.destroy = function(binding) {

	var d = Q.defer();

	userExists(binding.username)
		.then(dropUser)
		.then(function(result){
			d.resolve({});
		})
		.catch(function(error){
    		d.reject(error);
		});

	return d.promise;
};