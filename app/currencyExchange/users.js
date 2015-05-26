'use strict';
let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;

let UserModel = rootRequire('models/user.js');

let className = 'USERasdasdadS';  //DEBUG purposes

class Users {
	constructor (db) {
		this._usersDAO = new UserModel(db);
	}

	/**
	*
	*/
	add (user) {
		this._usersDAO.addUser (user.email, user.currency, user.rates, (err, inserted) => {
			if (err) return callback(err);

			return callback(null ,inserted);	
		});
	}

	// Might not be needed until unsuscribe. Delete after being in Github
	remove (user) {

		this._usersDAO.removeUser (user.email, (err, removed) => {
			if (err) return callback(err);

			return callback(null ,removed);	
		});
	}

	/**
	*
	*/
	activate (userEmail) {
		this._usersDAO.updateToActive (userEmail, (err, updated) => {
			if (err) return callback(err);

			return callback(null ,updated);	
		});
	}

	/**
	*
	*/
	emailIsSent (userEmail, date) {
		this._usersDAO.updateDateEmailSent (userEmail, date, (err, updated) => {
			if (err) return callback(err);

			return callback(null ,updated);	
		});
	}


	getCurrenciesFromActiveUsers (callback) {
		this._usersDAO.getCurrenciesFromActiveUsers ((err, currencies) => {
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

		this._usersDAO.getMatchingUsersByCurrency(currencyName, currencyRates, (err, users) => {
			if (err) return callback(err);

			let usersEmail = _extractEmailList(users);

			return callback(null, users);
		});
	}
}
module.exports = Users;