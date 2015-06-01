'use strict';
/**
 * User
 * @name UserRates
 * @description
 */

let Helpers = rootRequire('helpers');
let helpers = new Helpers();

let validate = helpers.validate;
let logger = helpers.logger;
let dateUtils = helpers.date;

var MongooseModelBase = require('./mongooseModelBase.js')
var className = 'UserRates_MODEL';

class UserRates extends MongooseModelBase {
	constructor(dbConfig) {

		super('UserRates', dbConfig, {
			symbol: { type: String, required: true},// change to currency
	    	min: { type: Number, min: 0.0000000001},
	    	max: { type: Number, min: 0.0000000001},
	    	user: { type: MongooseModelBase.getReferenceType(), ref: 'User'}
		});
	}

	addUserRates (user, rates, callback) {

		if (!user['_id']) {
			return callback(new Error('Can\t insert rates withouth inserting an user first'));
		}

		rates = [{
			symbol: 'EUR',// change to currency
			min: 1.3,
			max: 1.4
		},{
			symbol: 'JPY',// change to currency
			min: 0.1,
			max: 190
		}];

		rates.forEach(r => {
			r.user = user['_id'];
		})

	    return super.insert(callback, rates);
	}

	removeUserRates (user, callback) {
		let query = {email: user.email};

		if (user['_id']) {
			query = {'_id' : user['_id']};
		}

		return super.delete(callback, user['_id']);
	}

	getRatesMaxMinRatesByCurrency (usersId, currencyName, currencyRate, callback) {

		let query = {
			symbol: currencyName, // change to currency
			// min: {
				// glte: currencyRate
			// },
			user: {
				$in: usersId
			}
		};



		// if (user['_id']) {
		// 	query = {'_id' : user['_id']};
		// }

		return super.select(callback, query);
	}
}

module.exports = UserRates;
