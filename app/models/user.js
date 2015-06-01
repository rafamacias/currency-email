'use strict';
/**
 * User
 * @name User
 * @description
 */

var Helpers = rootRequire('helpers');
var helpers = new Helpers();

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   	email:  { type: String, lowercase: true, trim: true, validate: helpers.validate.email } ,
//  salt: { type: String, required: true }, 
//  hash: { type: String, required: true },
    active: { type: Boolean, default: false},
    lastEmailSent: {type: Date},
    currency: { type: String, required:true},
    rates: [{
    		name: { type: String, required:true},
			min: { type: Number, min: 0.0000000001},
			max: { type: Number, min: 0.0000000001}
	}],
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema); 