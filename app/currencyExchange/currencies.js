'use strict';
let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;

var className = 'CURRENCIES'
class Currencies {
	constructor (currencies, ratesApi) {

		//Save the current array of currencies in memory so API is only called 
		//once. WISH: Test the performance
		this.currencies = currencies || [];
		this._ratesApi = ratesApi;
		this._currentRates = null;
	}

	receive (callback) {

		var thisToChange = this;

		this.currencies.forEach(function (currency) {

			thisToChange._ratesApi.fetch(currency, function (err, currencyName, currencyRates) {
				
				if (err) {
					logger.error(err);
					return callback(err);
				}

				callback(null, currencyName, currencyRates);
			});
		});
	}

	set currentRates (values) {
		this._currentRates = values;
	}

	add (currency) {
		if (this.currencies.indexOf(currency) === -1) {
			this.currencies.push(currency);
		}
		return this;
	}

	// Might not be needed until unsuscribe. Delete after being in Github
	remove (currency) {
		let index = this.currencies.indexOf(currency);
		if (index > -1) {
		    this.currencies.splice(index, 1);
		}
		return this;
	}
}
module.exports = Currencies;