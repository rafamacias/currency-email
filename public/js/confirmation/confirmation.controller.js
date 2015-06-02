var logger = console;

class ConfirmationController {

	constructor (confirmationService) {
        this.user = {
            email: 'Rafa',
            currency: 'USD'
        }
	}
}

ConfirmationController.$inject = ['confirmationService'];

export default ConfirmationController;