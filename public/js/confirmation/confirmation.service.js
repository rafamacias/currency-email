import ApiService from '../services/apiService';

class ConfirmationService extends ApiService{
	constructor($http, configConstant) {
		super($http)
		this.baseUrl = configConstant.api.baseUrl + 'confirmations';
	}

	getconfirmations () {
		return super.get(this.baseUrl);
	}

	addconfirmation (confirmation) {
		return super.post(this.baseUrl, confirmation);
	}
}

ConfirmationService.$inject = ['$http', 'configConstant'];
export default ConfirmationService;