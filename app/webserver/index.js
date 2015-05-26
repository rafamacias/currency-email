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
	constructor (webserverConfig, dbConfig, viewsPath) {
		this._config = webserverConfig;
		this.app = express();


		this.app.engine('html', swig.renderFile);

		this.app.set('view engine', 'html');

		this.app.set('views', viewsPath);

		// Swig will cache templates for you, but you can disable
		// that and use Express's caching instead, if you like:
		this.app.set('view cache', false);
		// To disable Swig's cache, do the following:
		swig.setDefaults({ cache: false });
		// NOTE: You should always cache templates in a production environment.
		// Don't leave both of these to `false` in production!


		this.app.use(function(req, res, next){
		  	res.status(404);

			// respond with html page
			if (req.accepts('html')) {
			  return res.render('404', { url: req.url });
			}

			// respond with json
			if (req.accepts('json')) {
			  return res.send({ error: 'Not found' });
			}

			// default to plain-text. send()
			res.type('txt').send('Not found');
	 	});

		  /**
			TODO: ERROR HANDLING IMPORTANT
			http://expressjs.com/guide/error-handling.html
		  **/
	  	this.app.use(function(err, req, res, next) {
			console.error(err.stack);

			res.status(500);

			if (req.accepts('html')) {
				return res.render('500', { url: req.url });
			}

			let errorMessage = 'Something broke';
			if (req.accepts('json')) {
				return res.send({ error: errorMessage});
			}

			// default to plain-text. send()
			res.type('txt').send(errorMessage);
		});

		this.routes = new Routes(this.app);
	}

	init (callback) {

  		this.routes.init(this.app);

  		let port = this._config.port;

  		this.app.listen(port, function () {
    		logger.log(`Now listening in port ${port}`, className);
    		callback();
  		});
	}
}
module.exports = WebServer;