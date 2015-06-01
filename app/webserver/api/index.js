'use strict';
var Helpers = rootRequire('helpers');
var helpers = new Helpers();
var logger = helpers.logger;

var UsersController = rootRequire('currencyExchange/users');

/**
 * Routes
 * @name Routes
 * @description
 */
class Api {
	constructor (app, router) {
		this.app = app;
		this.router = router;
		this.users = new UsersController();
	}

	init () {

		this.router.use(function(req, res, next) {
  			// .. some logic here .. like any other middleware
  			next();
		});

		let thisToChange = this;

		this.router.route('/users')

			.post(function(req, res) {

				logger.log(req.body, 'THE BODY IS ');

				thisToChange.users.addUser(req.body, (err) => {
					if (err) return res.send(err);

					res.json({ message: 'User Added' });

					//TODO: Add this functionality so the currency is added on runtime
					//thisToChange.currencies.add(user.currency);
				});				
			})

			.get(function (req, res) {

				thisToChange.users.getAll(function(err, users) {
					if (err) res.send(err);

					res.json(users);
				});
			});


		let apiVersion = 'v1';

		this.app.use('/api/' + apiVersion, this.router);

	}
}
module.exports = Api;