'use strict';
/**
 * MongooseModelBase
 * @name MongooseModelBase
 * @description
 */
var mongoose = require('mongoose');
var Helpers = rootRequire('helpers');
var helpers = new Helpers();
var logger = helpers.logger;

class MongooseModelBase {
	constructor(name, dbConfig, schema) {
		this.db = dbConfig;
		this.name = name;
		this.schema = mongoose.Schema(schema);
		
		//find another name for model
		this.model = mongoose.model(this.name, this.schema);
		
		//This can cause problems. Maybe is better to init the database at the beggining
		if(!mongoose.connection.readyState) {
			mongoose.connect(this.db.name, err => {
	  			if (err) throw err;

	  			logger.log('Database connected');
			});
		}
	}

	static getReferenceType () {
		return mongoose.Schema.Types.ObjectId;
	}

	static disconnectDB (callback) {
		mongoose.disconnect(err => {
			if (err) throw err;
			logger.log('Database disconnected');	
			callback();
		});
	}

	selectDistinct (callback, field, query) {
		if (!query) query = {}; //TODO: change to default paramaters
		return this.model.distinct(field, query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	count (callback, query) {
		if (!query) query = {};

		return this.model.count(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	insert (callback, query) {
		return this.model.insert(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	delete (callback, query) {
		if (!query) query = {};
		return this.model.remove(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	select (callback, query, projection) {
		if (!query) query = {};
		if (!query) query = {};

		return this.model.find(query, projection, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}
}

module.exports = MongooseModelBase;
