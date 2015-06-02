import _ from 'lodash';

var logger = console;

class UserController {

	constructor ($state, userService) {
		this.$state = $state;
		this.userService = userService;

        //TODO: make this available in the DB
		this.currencies = ['GBP', 'EUR', 'JPY', 'USD'];

		this.selectedItem = false;
		this.selectedRates = [];

	    this.user = {
	    	email: 'test@test.com',
	    	currency: 'USD',
	    	rates: [{
	    		name: 'GBP',
	    		min: 222
	    	}]
	    };
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

    updateRates(currencySelected) {

        let rates = _.without(this.currencies, currencySelected);
       	let result = [];
        rates.forEach(function (rate) {
        	result.push({name :rate});
        })

	    // Remove the new currency selected from the user selection when it changes
        _.remove(this.user.rates, {name:currencySelected})

		this.rates = result;
    }


	currentUser () {
    	return 'getCurrent User';
    }


    addUser (user) {
    	if (user && user.email) {
    		logger.log('Adding to DB ' + user.email);

    		this.userService.addUser(user)
	    		.then((data) => {

	                this.$state.go("pending", user);

	    		})
	    		.error(() => {
	    			logger.error('Error adding the user');
	    			logger.info('please try again')
	    		});
    	}
    }
}

UserController.$inject = ['$state', 'userService'];

export default UserController;