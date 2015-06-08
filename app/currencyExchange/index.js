'use strict';
let EmailManager = require('./email.js');
let Currencies = require('./currencies.js');
let Users = require('./users.js');

// DI
let RatesApi = rootRequire('facade/ratesApiFake.js'); //Change when the API is OK :)

let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;
var mongoose = require('mongoose');
var DatabaseConnection = rootRequire('facade/db.js')

let className = 'CURRENCY EXCHANGE';  //DEBUG purposes

class CurrencyRatesManager {
	constructor (dbConfig, apiConfig, emailConfig, intervalFrequency) {
		this._timeId = null;
		this._frequency = intervalFrequency;
		this._currencies = null;

		this._dbConfig = dbConfig;

		this.EmailManager = EmailManager;

		this.DatabaseConnection = DatabaseConnection;

		this._users = new Users();

		this._ratesAPI = new RatesApi(apiConfig);  /// What is better pass the class or the instance????
	}

	init () {

		function getCurrentRates() {

			thisToChange._currencies.receive(function (err, currencyName, currencyRates) {
				if (err) {
					return logger.error(err, className);
				}

				//logger.log(currencyName, className);
				//logger.log(currencyRates);

				thisToChange._users.getEmailsOfUSersByCurrency(currencyName, currencyRates, function (err, usersEmail) {
					if (err) {
						return logger.error(err, className);
					}

					logger.log(usersEmail, className);

					let emailManager = new thisToChange.EmailManager(thisToChange._emailSender);
					emailManager.send(usersEmail, currencyName, currencyRates);
				});
			});
		}


		let thisToChange = this;
		let db = new this.DatabaseConnection();

		db.connect(this._dbConfig.name, () => {

			// Get the currencies of the users on initialization
			thisToChange._users.getCurrenciesFromActiveUsers(function (err, currencies) {
				if (err) {
					logger.error('The server can\'t init', className);
					logger.error(err, className);
					return;
				}

				logger.info('Currencies received: ' + currencies);

				// Initialize the currencies and the API
				thisToChange._currencies = new Currencies(currencies, thisToChange._ratesAPI);

				// Receive the rates from the API and check the user
				getCurrentRates();

				//Init the interval to get the curent rates
				thisToChange._timeId = setInterval( getCurrentRates, thisToChange._frequency); 

			});

				
		});

		return this;
	}

	// stop () {
	// 	clearInterval(this._timeId);
	// 	this._timeId = null;
	// 	return this;
	// }

	// // The web server should have a function to add a Currency when a new user is
	// // introduced
	// addUser (user) {
	// 	this._currencies.add(user.currency);
	// 	return this;
	// }
}
module.exports = CurrencyRatesManager;

		// users : [{
		// 	name: 'rafa', 
		// 	base: 'GBP',
		// 	rates: {
		// 		EUR: {
		// 			min: 1.35,
		// 			max: 1.40
		// 		}
		//  		JPY: {
		//  			min: 175,
		//  			max: 190
		//  		}
		// 	}
		// },{
		// 	name: 'javi', 
		// 	base: 'USD',
		// 	rates: {
		// 		GBP: {
		// 			min: 1.35,
		// 			max: 1.40
		// 		}
		//  		JPY: {
		//  			min: 175,
		//  			max: 190
		//  		}
		// 	}
		// }];
		// rates: {
		// 	GBP : {
		// 		EUR: "1.3823423",
		// 		JPY: "187.123213"
		// 	}
		// },{
		// 	USD : {
		// 		EUR: "5.73996056",
		// 		JPY: "94.99536040"
		// 	}
		// }
		// allCurrenciesRatesFetched.then( function(rates) {
		// 	let user;
		// 	let usersToSendEmail = [];

		// 	for (let i = users.length - 1; i >= 0; i--) {
		// 		user = users[i];

		// 		for (let currencyName in rates) {

		// 			if (user.currency === currencyName) {

		// 				let currencyRates = rates[currencyName];

		// 				let currency = new Currency(currencyName, currencyRates);

		// 				for(let userCurrency in user.rates) {
		// 					if ( currency.isGreater (userCurrency, user.rates[userCurrency].max)
		// 					||   currency.isLower(userCurrency, user.rates[userCurrency].mmin)) { 

		// 						let userRate = {
		// 							user : user.name,
		// 							currency: user.currency,
		// 							rates: currencyRates
		// 						};
		// 						usersToSendEmail.push(userRate);
		// 					}	
		// 				}
		// 			}
		// 		}
		// 	}

		// 	return usersToSendEmail;
		// });