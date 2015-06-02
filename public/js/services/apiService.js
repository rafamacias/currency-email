
var logger = console;

class ApiService {
	constructor($http) {
		this.$http = $http;
	}

	get (url) {
		return this._callAPI('get', url);
	}

	post (url, payload) {
		return this._callAPI('post', url, payload);
	}

	// Helpers
	_callAPI (method, url, payload) {

		return this.$http[method](url, payload).
            success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

                logger.log(data)
                logger.log(status)
                logger.log(headers)
                logger.log(config)

            }).
            error(function(data, status, headers, config) {
            	logger.error(`Error calling the api ${url} with method ${method}. Status: ${status}. Data: ${data}`);
           	});
	}
}

ApiService.$inject = ['$http'];
export default ApiService;