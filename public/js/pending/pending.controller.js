//import io from 'socket.io';

var logger = console;

class PendingController {

	constructor ($state, pendingService, webSocket) {
		this.$state = $state;
        this.user = {
            email: 'Rafa',
            currency: 'USD'
        }

        webSocket.on('user:confirmation', (msg) => {
	    	this.confirmUser()
	  	});
  	}

	confirmUser () {
		this.$state.go('confirmation');
	}

}

PendingController.$inject = ['$state', 'pendingService', 'webSocket'];

export default PendingController;