'use strict';
var request = require('request');

var Helpers = rootRequire('helpers');
var logger = new Helpers().logger;
var mongoose = require('mongoose');
rootRequire('models');
/**
* Class MongoDB
*	
*
*/
class MongoDB {
	constructor () {}

	connect (dbName, callback) {
		if(!mongoose.connection.readyState) {

			mongoose.connect(dbName, err => {
	  			if (err) throw err;
	  			logger.log('Database connected');

	  			return callback();
	  		});
		}
	}

	disconnect (callback) {
		mongoose.disconnect(err => {
			if (err) throw err;
			logger.log('Database disconnected');	
			return callback();
		});
	}
}
module.exports = MongoDB;