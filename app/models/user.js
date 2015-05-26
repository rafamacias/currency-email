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
var UserRates = require('./userRates.js')
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
		    preferredCurrency: { type: String, required: true, trim: true},
		    created: {type: Date, default: Date.now}
		});

		this.ratesModel = new UserRates(dbConfig);
	}

	getCurrenciesFromActiveUsers (callback) {

		let field = 'currency.symbol',
			query = { active: true };

		return super.selectDistinct(callback,field, query);
	}

	getMatchingUsersByCurrency (currencyName, currencyRates, callback) {
		let nowTS = Date.now();

		let query = {
			"$or" : [
				{
					"active" : true,
					"lastEmailSent" : {
						"$lte" : new Date()
					}
				},
				{
					"active" : true,
					"lastEmailSent" : {
						"$exists" : false
					}
				}
			]
		};
		return super.selectDistinct(callback, 'email', query)
	}

	addUser (email, preferredCurrency, rates, callback) {

		let user = { email, preferredCurrency };

		//Looks weird because the callback goes first.
	    super.insert(user, (err, userInserted) => {
	    	if (err) throw err;

	   		return this.ratesModel.addUserRates(userInserted, rates, callback);

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
