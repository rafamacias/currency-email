'use strict';
var request = require('request');

let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;

/**
*	Abstract Class ApiBase
*	
*
*/
class ApiBase {
	constructor () {}

	// TODO: change this to promise syntax like
	fetch (url, callback) {

		return request(url, (err, response, body) => {

			if (err) {
				logger.error('Error happened: ' + err);
				return callback(err);
			}

			if (response.statusCode != 200) {
				logger.warn('Response with status: ' + response.statusCode);
				return callback(err);
			}

			logger.info('Request received from the API: ' + url);

			return callback(null, body);
		});
	}
}
module.exports = ApiBase;