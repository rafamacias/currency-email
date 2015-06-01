import material from './vendor';
import config from './config';

import WebSocket from './websocket';

import UserModule from './user/user.module';


angular.element(document).ready(function() {

	let body = document.getElementsByTagName("body")[0];

	let app = angular.module(config.appName, [
	    	material,
	    	UserModule.name
		])
		.service(WebSocket.name, WebSocket);


	angular.bootstrap(body, [app.name], { strictDi: true });
});
