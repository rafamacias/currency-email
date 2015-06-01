import {userService, router} from '../fake';


class UserController {

	constructor () {}

	currentUser () {
    	return 'getCurrent User';
    }


    addUser (user, rates) {
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