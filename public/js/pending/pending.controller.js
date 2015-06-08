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
        	if (!msg.sessionId) {
        		this.confirmUser();	
        	}
	  	});
  	}

	confirmUser () {
		this.$state.go('confirmation', [{data: '1234'}]);
	}

}

PendingController.$inject = ['$state', 'pendingService', 'webSocket'];

export default PendingController;