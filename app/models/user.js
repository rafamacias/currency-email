'use strict';
/**
 * User
 * @name User
 * @description
 */

let Helpers = rootRequire('helpers');
let helpers = new Helpers();

let validate = helpers.validate;
let logger = helpers.logger;
let dateUtils = helpers.date;

var MongooseModelBase = require('./mongooseModelBase.js')
//var UserRates = require('./userRates.js')
var className = 'USER_MODEL';

class User extends MongooseModelBase {
	constructor(dbConfig) {
		super('User', dbConfig, {
		    //_id: { type: String, lowercase: true, trim: true, validate: validate.email } ,
		    email:  { type: String, lowercase: true, trim: true, validate: validate.email } ,
		//  salt: { type: String, required: true }, 
		//  hash: { type: String, required: true },
		    active: { type: Boolean, default: false},
		    lastEmailSent: {type: Date},
		    currency: { type: String, required: true, trim: true},
		    rates: [{
		    		symbol: { type: String, required: true},
	    			min: { type: Number, min: 0.0000000001},
	    			max: { type: Number, min: 0.0000000001}
	    	}],
		    created: {type: Date, default: Date.now}
		});

		// this.ratesModel = new UserRates(dbConfig);
	}

	getCurrenciesFromActiveUsers (callback) {

		let field = 'currency',
			query = { active: true };

		return super.selectDistinct(callback,field, query);
	}

	getMatchingUsersByCurrency (currencyName, currencyRates, callback) {
		
		function matchResults (userRate) {
			var rateValue = apiData.rates[userRate.currency];

			if( (userRate.min && userRate.min > rateValue) || (userRate.max && userRate.max < rateValue) ) {
				return true;
			}
			return false
		}

		let nowTS = Date.now();

		let query = {
			"$or" : [
				{
					"active" : true,
					"currency": currencyName,
					"lastEmailSent" : {
						"$lte" : new Date()
					}
				},
				{
					"active" : true,
					"currency": currencyName,
					"lastEmailSent" : {
						"$exists" : false
					}
				}
			]
		};

// 		let thisToChage = this;

// 		return super.select((err, users) => {
// 			if (err) throw err;

// 			logger.log(users, 'Selecting active users with currencyName = ' + currencyName);

// 			let usersId = [];
// 			users.forEach(u => {
// 				usersId.push(u['_id']);
// 			});

// 			return thisToChage.ratesModel.getRatesMaxMinRatesByCurrency(usersId, currencyName, currencyRates, (err, usersEmails) => {
// 				logger.log(usersEmails, 'usersEmails');
// 			});
// 		}, query);

		let aggregation = [
			{$match: {
				active:true, 
				currency : currencyName

			}},
			{$unwind: '$rates'}
		];

		let model = super.getModel();

		let cursor = model.aggregate(aggregation, (err, results) => {
	    	if (err) throw err;

			let users = [];

			results.forEach((user) => {
				for(let i = 0; user.rates.length; i++) {
					if (matchResults(user.rates[i])) {
						logger.log(user.email);

						users.push(user);
					}
				}
			});
			callback(users);
		});
		//return super.selectDistinct(callback, 'email', query)
	}

	getAll (callback) {
		super.count((err, userInserted) => {
	    	if (err) throw err;

	   		callback(userInserted);

	    }, {});
	}

	addUser (email, currency, rates, callback) {

		let user = { email, currency };

		let thisToChage = this;

		//Looks weird because the callback goes first.
	    super.insert(user, (err, userInserted) => {
	    	if (err) throw err;

	   		return thisToChage.ratesModel.addUserRates(userInserted, rates, callback);

	    }, user );
	}

	removeUser (email, callback) {

		let user = {email};

		//Looks weird because the callback goes first.
		super.delete((err, userRemoved) => {
	    	if (err) throw err;

	    	return this.ratesModel.removeUserRates(userRemoved, callback);

	    }, user );
	}
}

module.exports = User;
