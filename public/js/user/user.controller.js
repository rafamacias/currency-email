import fake from '../fake';

var router = fake.router;

class UserController {

	constructor ($http) {

        //TODO: make this available in the DB
		this.currencies = ['GBP', 'EUR', 'JPY', 'USD'];

		this.selectedItem = false;
		this.selectedRates = [];

	    this.rates = this._loadRates();
	    this.user = {
	    	email: '',
	    	currency: '',
	    	rates: []
	    };
   
        this.$http = $http;
	}

	 /**
     * Search for rates.
     */
    querySearch (query) {
      	return query ? this.rates.filter(this._createFilterFor(query)) : [];
    }
    /**
     * Create filter function for a query string
     */
   	_createFilterFor(query) {
      	let uppercaseQuery = angular.uppercase(query);
      	return function filterFn(rate) {
			return (rate.name.indexOf(uppercaseQuery) === 0);
      	};
    }
    _loadRates() {
        //TODO: make this available in the DB
      return [
        {
          'name': 'USD'
        },{
          'name': 'JPY'      
        },{
          'name': 'EUR'
        },
        {
          'name': 'GBP'
        },
        {
          'name': 'AUD'
        }
      ];
    }


	currentUser () {
    	return 'getCurrent User';
    }


    addUser (user) {
    	if (user && user.email) {
    		console.log('Adding to DB ' + user.email);

            //TODO: move to a service
            this.$http.post('/api/v1/users', user).
                success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                    console.log(data)
                    console.log(status)
                    console.log(headers)
                    console.log(config)

                    router.redirect('pending page') 
                }).
                error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
    	}
    }
}

UserController.$inject = ['$http'];

export default UserController;