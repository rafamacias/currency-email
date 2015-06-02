var config = {};

config.appName = 'rafa';

config.logger = console;

config.api = {
	version: 1
};
config.api.baseUrl = `/api/v${config.api.version}/`;

export default config;
