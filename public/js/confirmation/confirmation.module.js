import confirmationDirective from './confirmation.directive';
import confirmationService from './confirmation.service';
import confirmationRoute from './confirmation.route';

export default angular.module('Confirmation', [])
	// .config(confirmationRoute)
	.service('confirmationService', confirmationService)
	.directive('confirmation', confirmationDirective);