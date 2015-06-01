import fake from '../fake';

var userService = fake.userService;
var router = fake.router;


class UserController {

	constructor () {
		this.currencies = ['GBP', 'EUR', 'JPY', 'USD'];

		this.selectedItem = false;
		this.selectedRates = [];

	    this.rates = this.loadRates();
	    this.user = {
	    	email: 'rafakol@hotmail.com',
	    	currency: '',
	    	rates: []
	    };
   
	}

	 /**
     * Search for rates.
     */
    querySearch (query) {
      	return query ? this.rates.filter(this.createFilterFor(query)) : [];
    }
    /**
     * Create filter function for a query string
     */
   	createFilterFor(query) {
      	let uppercaseQuery = angular.uppercase(query);
      	return function filterFn(rate) {
			return (rate.name.indexOf(uppercaseQuery) === 0);
      	};
    }
    loadRates() {
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

    		userService.insert(user, (err, inserted) => {
    			router.redirect('pending page')	
    		});
    	}
    }

}

UserController.$inject = [];

export default UserController;