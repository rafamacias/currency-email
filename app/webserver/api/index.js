'use strict';
var Helpers = rootRequire('helpers');
var helpers = new Helpers();
var logger = helpers.logger;

var User = rootRequire('models/user');

/**
 * Routes
 * @name Routes
 * @description
 */
class Api {
	constructor (app, router) {
		this.app = app;
		this.router = router;
	}

	init () {

		this.router.use(function(req, res, next) {
  			// .. some logic here .. like any other middleware
  			next();
		});

		this.router.route('/users')

			.post(function(req, res) {
				let user = new User(req.body);
			 
				user.addUser(function(err) {
				  	if (err) return res.send(err);
				 
				    res.json({ message: 'User Added' });
				});
			})

			.get(function (req, res) {

				let user = new User({email: 'rafatest@test.com', currency: 'USD'});

				console.log('get request');
				console.log(User);
				user.getAll(function(err, users) {
					if (err) res.send(err);

					res.json(users);
				});
			});


		let apiVersion = 'v1';

		this.app.use('/api/' + apiVersion, this.router);

	}
}
module.exports = Api;