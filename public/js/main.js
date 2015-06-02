import angularDependencies from './vendor';

import config from './config';

import WebSocket from './websocket';

import UserModule from './user/user.module';

angular.element(document).ready(function() {

	let body = document.getElementsByTagName("body")[0];

	let dependencies = angularDependencies.concat([
		UserModule.name
	]);

	let app = angular.module(config.appName, dependencies)
		.constant('configConstant', config)
		.service(WebSocket.name, WebSocket);


	app.config(Router);

	function Router($stateProvider, $urlRouterProvider) {
		  //
		  // For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/");
		  //
		  // Now set up the states
		$stateProvider
		.state('pending', {
			url: "/pending",
	      	templateUrl: "js/partials/pending.html",
	      	controller: PendingController
		})
	    .state('pending.confirmation', {
	      	url: "/confirmation",
	      	templateUrl: "js/partials/pending.confirmation.html",
	      	controller: function($scope) {
	        	$scope.items = ["A", "List", "Of", "Items"];
	    	}
    	});
	}

	function PendingController ($scope) {
		console.log('I am the controller of pending');

  		$scope.user = {
  			email: 'rafa',
  			currency: 'USD'
  		};
	}

	PendingController.$inject = ['$scope'];

	Router.$inject = ['$stateProvider', '$urlRouterProvider'];

	angular.bootstrap(body, [app.name], { strictDi: true });
});
