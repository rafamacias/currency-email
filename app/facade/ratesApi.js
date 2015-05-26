'use strict';
var ApiBase = require('./apiBase.js');

let Helpers = rootRequire('helpers');
let logger = new Helpers.logger;

/**
*	Class RatesApi
*	
*
*/
class RatesApi extends ApiBase{
	
	constructor (config) {
		super();
		this._apiKey = config.apiKey;
		this._baseUrl = config.baseUrl;
		this._currencyNameKey = 'base';
		this._ratesKey ='rates';
	}

	fetch (currencyBase, callback) {

		// TODO: make this work with config.baseUrl
		var url = `http://jsonrates.com/get/?base=${currencyBase}&apiKey=${this._apiKey}`;

		logger.log('url: ' + url);

		var thisToChange = this;

		super.fetch(url, (err, body) => {
			if (err) return callback(err);

			let currencyName = body[thisToChange._currencyNameKey];
			let currencyRates = body[thisToChange._ratesKey];

			return callback(null, currencyName, currencyRates);

		});
	}
}
module.exports = RatesApi;