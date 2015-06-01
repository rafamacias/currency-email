'use strict';
/**
 * WebServer
 * @name WebServer
 * @description
 */

var express = require('express');
var Helpers = rootRequire('helpers');
var logger = new Helpers().logger;
var Routes = require('./routes');
var swig = require('swig');

var className = 'WEBSERVER';
class WebServer {
	constructor (webserverConfig, dbConfig) {
		
		this._config = webserverConfig;

		this.app = express();

		this.routes = new Routes(this.app);
	}

	init (callback) {

		let config = this._config;

		this.app.engine('html', swig.renderFile);

		this.app.set('view engine', 'html');

		this.app.set('views', config.paths.views);

		// Swig will cache templates for you, but you can disable
		// that and use Express's caching instead, if you like:
		this.app.set('view cache', false);
		// To disable Swig's cache, do the following:
		swig.setDefaults({ 
			cache: false,
			varControls: config.templateTags
		});
		// NOTE: You should always cache templates in a production environment.
		// Don't leave both of these to `false` in production!
		
		this.app.use(express.static(config.paths.static));

  		this.routes.init(this.app);
		
  		let app= this.app;
  		this.app.listen(config.	port, function () {
    		logger.log(`Now listening in port ${config.port}`, className);
    		callback()
  		});
	}
}
module.exports = WebServer;