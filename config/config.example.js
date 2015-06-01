'use strict'

var config = {};

// TODO: codify this user and password and create another only for this
config.email = {
	server : {
		service: 'Gmail',
	    auth: {
	        user: 'email@gmail.com',
	        pass: 'password'
	    }
	},
	from:'Origin Person <origin@gmail.com>',
	subject: 'The currencies have changed. Time to exchange money',
	defaultText: 'Check the rates. They might have changed'
};

config.db = {

};

module.exports = config;
