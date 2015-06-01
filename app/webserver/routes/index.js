'use strict';
var ExpressRouterBase = require('./expressRouterBase.js');
var Helpers = rootRequire('helpers');
var helpers = new Helpers();
var logger = helpers.logger;

/**
 * Routes
 * @name Routes
 * @description
 */
class Routes extends ExpressRouterBase {
	constructor (app) {
		super (app);
		this.app = app;
	}

	init () {

		let homeConfig = {
				path: '/',
				template: 'home',
				data: {
					page: {
						title: 'home'
					},
					home : {
						placeholder: 'enter your email here...',
						submit: "Submit"
					}
				}
			};

		super.get(homeConfig);

		super.handleError();

		// let errorHandler = new ErrorHandler(this.app);
		// errorHandler.init();

	//I like this way
	 // var sessionHandler = new SessionHandler(db);
  //   var contentHandler = new ContentHandler(db);

  //   // Middleware to see if a user is logged in
  //   app.use(sessionHandler.isLoggedInMiddleware);

  //   // The main page of the blog
  //   app.get('/', contentHandler.displayMainPage);

  //   // The main page of the blog, filtered by tag
  //   app.get('/tag/:tag', contentHandler.displayMainPageByTag);

	}
}
module.exports = Routes;