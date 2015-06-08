var logger = console;

class ConfirmationController {

	constructor (confirmationService, webSocket) {
        this.user = {
            email: 'Rafa',
            currency: 'USD'
        }
        
        console.log('confirmation on connect');
		
		webSocket.emit('user:confirmed', 'userID12312312');
	}
}

ConfirmationController.$inject = ['confirmationService', 'webSocket'];

export default ConfirmationController;