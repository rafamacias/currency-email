'use strict';

var regexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;

class Validate {
    constructor () {
    	this._emailRegexp = new RegExp(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/);
    }

    email (email) {

    	// Code from email-validator module
    	// https://www.npmjs.com/package/email-validator
    	if (email.length > 254) return false;

		if (!regexp.test(email)) return false;

		// Further checking of some things regex can't handle
		let parts = email.split("@");
		if (parts[0].length > 64) return false;

		if (parts[1].split(".").some(part => { return part.length>63; })) {
			return false;
		}
		return true;
	}
}
module.exports = Validate;