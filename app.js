'use strict';
global.rootRequire = function(name) {
    return require(__dirname + '/app/' + name);
}

var config = require('./config');
var EX = require('./app/currencyExchange');
var WebServer = require('./app/webserver');


// Start the server
var webserver = new WebServer(config.webserver,	config.db);

webserver.init(function () {

	// Start the currencyFetcher
	var exManager = new EX(config.db, config.currencyAPI, config.email, 
							1000 * 60 );		//every minute

	exManager.init();
});
