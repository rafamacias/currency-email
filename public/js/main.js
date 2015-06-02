import angularDependencies from './vendor';

import config from './config/config';

import WebSocket from './websocket';

import UserModule from './user/user.module';
import PendingModule from './pending/pending.module';
import ConfirmationModule from './confirmation/confirmation.module';

angular.element(document).ready(function() {

	let body = document.getElementsByTagName("body")[0];


	console.log(PendingModule.name);

	let dependencies = angularDependencies.concat([
		UserModule.name,
		PendingModule.name,
		ConfirmationModule.name
	]);

	console.log(WebSocket.name);

	let app = angular.module(config.appName, dependencies)
		.config(config.routerConfig)
		.constant('configConstant', config.constant)
		.service(WebSocket.name, WebSocket);

	angular.bootstrap(body, [app.name], { strictDi: true });
});
