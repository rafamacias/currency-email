'use strict';
/**
 * Routes
 * @name Routes
 * @description
 */
class Routes {
	constructor (app) {
		this.app = app;
	}

	init () {
		this.app.get('/', function (req, res, next) {
			//res.send(200, 'hello');
			res.render('home', {
				page: {
					title: 'home'
				},
				home : {
					placeholder: 'enter your email here...',
					submit: "Submit"
				}
			});
		});
	}
}
module.exports = Routes;