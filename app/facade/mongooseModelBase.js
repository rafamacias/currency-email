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
	constructor(modelName) {
		this.model = mongoose.model(modelName);
	}

	static getReferenceType () {
		return mongoose.Schema.Types.ObjectId;
	}

	getModel () {
		return this.model;
	}
	
	selectDistinct (field, query, callback) {
		if (!query) query = {}; //TODO: change to default paramaters

		return this.model.distinct(field, query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	count (query, callback) {
		if (!query) query = {};

		return this.model.count(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	insert (query, callback) {
		return this.model.save(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	delete (query, callback) {
		if (!query) query = {};

		return this.model.remove(query, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	select (query, projection, callback) {
		if (!query) query = {};

		return this.model.find(query, projection, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });
	}

	aggregate (aggregation, callback) {
		if (!aggregation) aggregation = {};

		return this.model.aggregate(aggregation, function (err, values) {
	       if (err) return callback(err);

	       callback (null, values);
   	    });

	}
}

module.exports = MongooseModelBase;
