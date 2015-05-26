'use strict';

var request = require('request');

let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;
var fakeData = {
	GBP: {
		utctime: "2015-05-23T12:40:02+02:00",
		base: "GBP",
		rates: {
			EUR: "1.40656455",
			JPY: "188.26349298",
			USD: "1.54904749"
		}
	},
	EUR : {
		utctime: "2015-05-23T12:50:01+02:00",
		base: "EUR",
		rates: {
			USD: "1.10129854",
			JPY: "133.84632260",
			GBP: "0.71095208"
		}
	},
	USD : {
		utctime: "2015-05-23T12:50:01+02:00",
		base: "EUR",
		rates: {
			EUR: "0.90801900",
			JPY: "121.53500400",
			GBP: "0.64555800"
		}
	},
	JPY : {
		utctime: "2015-05-23T12:50:01+02:00",
		base: "EUR",
		rates: {
			EUR: "0.00747125",
			USD: "0.00822808",
			GBP: "0.00531170"
		}
	}
};

/**
*	Class RatesApi
*	
*
*/

let className = 'RATESAPI';  //DEBUG purposes
class RatesApi {
	
	constructor (config) {
		this._apiKey = config.apiKey;
		this._baseUrl = config.baseUrl;
	}

	// TODO: change this to promise syntax like
	fetch (currencyBase, callback) {

		return setTimeout( function () {
			if(Math.random().toString().search('333') != -1) { //An error that could occur sometimes
				var err = new Error('FUCKKKKKKKKKKKKKKK An error occured');
				logger.error('Error happened: ' + err);
				return callback(err);
			}

			logger.log(fakeData[currencyBase], className + ' fetch fake API');
			let result = fakeData[currencyBase];
			return callback(null, result.base, result.rates);

		}, 100);
	}
}
module.exports = RatesApi;