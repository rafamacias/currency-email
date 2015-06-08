'use strict';
/**
 * WebServer
 * @name WebServer
 * @description
 */

var express = require('express');
var bodyParser = require('body-parser')
var Helpers = rootRequire('helpers');
var logger = new Helpers().logger;
var Routes = require('./routes');
var Api = require('./api');
var swig = require('swig');
var socketIO = require('socket.io');


var className = 'WEBSERVER';
class WebServer {
	constructor (webserverConfig, dbConfig) {
		
		this._config = webserverConfig;

		this.app = express();

		this.routes = new Routes(this.app);
		this.api = new Api(this.app, express.Router())
	}

	init (callback) {

		let config = this._config;

		this.app.engine('html', swig.renderFile);

		this.app.set('view engine', 'html');

		this.app.set('views', config.paths.views);

		this.app.use(bodyParser());


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

  		let app= this.app;
  		let server = this.app.listen(config.	port, function () {
    		logger.log(`Now listening in port ${config.port}`, className);
    		callback()
  		});

  		//TODO: Move this to a socket service
  		var io = socketIO.listen(server);


		io.on('connection', function(socket){
			logger.log('socket connected');

		  	socket.on('user:confirmed', function(msg){
		  		logger.log('confirmed user : ' + msg);

		    	io.emit('user:confirmation', msg);
		  	});
		});


		// io.on('connect', function(socket){
		// 	logger.log('a user connected', 'SOCKET');
		// 	//logger.log(socket);

		// 	io.on('user:confirmed', function(msg){
		// 		logger.log('user confirmed ' + msg, 'SOCKET');

		// 		io.emit("user:confirmation");
		// 	});

		// 	io.on('user:rafa', function (msg) {
		// 		logger.log('user:rafa' + msg, 'SOCKET');
		// 	});
		// });

		

  		this.api.init(io);

  		this.routes.init(this.app);



	}
}
module.exports = WebServer;