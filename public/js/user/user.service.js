import ApiService from '../services/apiService';

class UserService extends ApiService{
	constructor($http, configConstant) {
		super($http)
		this.baseUrl = configConstant.api.baseUrl + 'users';
	}

	getUsers () {
		return super.get(this.baseUrl);
	}

	addUser (user) {
		return super.post(this.baseUrl, user);
	}
}

UserService.$inject = ['$http', 'configConstant'];
export default UserService;