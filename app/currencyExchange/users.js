'use strict';
var Helpers = rootRequire('helpers');
var logger = new Helpers().logger;

var Repository = rootRequire('facade/mongooseModelBase')

var className = 'USERSSSSSS';  //DEBUG purposes

class Users extends Repository {
	constructor () {
		super('user');
		//this.model = super.getModel();
	}

	/**
	*
	*/
	addUser (user, callback) {

		let UserModel = super.getModel();

		let userModel = new UserModel(user);

		userModel.save(function (err) {
			if (err) return callback(err);
		  	logger.log('New user saved in the DB');

		  	return callback();
		});
	}


	getAll (callback) {
		super.select({}, (err, all) => {
			if (err) return callback(err);

			return callback(null ,all);	
		});
	}

	// Might not be needed until unsuscribe. Delete after being in Github
	remove (user, callback) {
		throw new Error ('Not yet implemented');
	}

	/**
	*
	*/
	activate (userEmail, callback) {
		throw new Error ('Not yet implemented');
		this._usersDAO.updateToActive (userEmail, (err, updated) => {
			if (err) return callback(err);

			return callback(null ,updated);	
		});
	}

	/**
	*
	*/
	emailIsSent (userEmail, date, callback) {
		throw new Error ('Not yet implemented');
		this._usersDAO.updateDateEmailSent (userEmail, date, (err, updated) => {
			if (err) return callback(err);

			return callback(null ,updated);	
		});
	}


	getCurrenciesFromActiveUsers (callback) {

		let field = 'currency',
			query = { active: true };

		super.selectDistinct(field, query, (err, currencies) => {
			if (err) return callback(err);

			return callback(null ,currencies);	
		});
	}

	// TODO: this might be done at DB level. See mongoDB course
	getEmailsOfUSersByCurrency (currencyName, currencyRates, callback) {

		function _extractEmailList (users) {

			let emailList = '';

			users.forEach(u => {
			  	emailList += ',' + u.email;
			});

			//Remove the first comma. HACK
			emailList = emailList.slice(1);

			return emailList;
		}
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

		let aggregation = [
			{$match: {
				active:true, 
				currency : currencyName

			}},
			{$unwind: '$rates'}
		];

		//TODO: Change this to make the function simpler in the controller and not DB dependent
		let cursor = super.aggregate(aggregation, (err, results) => {
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
			callback(null, users);
		});
	}
}
module.exports = Users;