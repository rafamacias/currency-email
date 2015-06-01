'use strict';
/**
 * ExpressRouterBase
 * @name ExpressRouterBase
 * @description
 */
class ExpressRouterBase {
	constructor (app, messages) {
		this.app = app;

		this.messages = {
			'404' : 'Not Found',
			'500' : 'Something broke'
		};
	}

	handleError (status, fn) {
		function handleRequest(status, req, res) {
			res.status(status);

			if (req.accepts('html')) {
				return res.render(status.toString(), { url: req.url });
			}
			if (req.accepts('json')) {
				return res.send({ error: thisToChange.messages[status]});
			}
		}
		var thisToChange = this;

		this.app.use(function(req, res) {
			handleRequest(404, req, res);
			
		});

		this.app.use(function(err, req, res) {
    		console.error('error at %s\n', req.url, err.stack);
			handleRequest(500, req, res);
		});
 	}



 	get (requestConfig) {
 		this.app.get(requestConfig.path, function (req, res, next) {
			res.render(requestConfig.template, requestConfig.template);
		});
 	}
}
module.exports = ExpressRouterBase;