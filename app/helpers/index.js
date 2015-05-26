'use strict';
let isDev = true;
/**
*	Class Framework
*	
*
*/
class Utils {

	constructor () {
		this._logger = require('./log.js');
		this._server = require('./server.js');
		this._date = require('./date.js');
		this._validate = require('./validate.js');
		this._noop = function () {}
	}

	get logger () { return new this._logger(isDev); }

	get server() { return new this._server(); }

	get validate () { return new this._validate(); }

	get date () { return new this._date(); }

	get noop () { return this._noop; }

}

module.exports = Utils;