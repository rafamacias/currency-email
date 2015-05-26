'use strict';
global.rootRequire = function(name) {
    return require(__dirname + '/app/' + name);
}

let config = require('./config');
let EX = require('./app/currencyExchange');
let WebServer = require('./app/webserver');


// Start the server
var viewsPath = __dirname + '/app/views'

var webserver = new WebServer(config.webserver, 
							  config.db,
							  viewsPath);

webserver.init(() => {
	
	// Start the currencyFetcher
	let exManager = new EX(config.db,
						   config.currencyAPI, 
						   config.email, 
						   1000 * 60 );		//every minute
	exManager.init();
});


