import './vendor';
import config from './config';

import WebSocket from './websocket';

import UserModule from './user/user.module';

let mainModule = angular.module(config.appName, [
    	UserModule.name,
	])
	.service(WebSocket.name, WebSocket);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainModule.name], { strictDi: true });
});

export default mainModule;
