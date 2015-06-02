var config = {};

config.appName = 'rafa';

config.logger = console;


config.constant = {
	api: {
		version: 1
	}
};
config.constant.api.baseUrl = `/api/v${config.constant.api.version}/`;


function routerConfig($locationProvider, $urlRouterProvider) {
	 // use the HTML5 History API
	//$locationProvider.html5Mode(true);

	  // For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/");
}
routerConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

config.routerConfig = routerConfig;

export default config;
