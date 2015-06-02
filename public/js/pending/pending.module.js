import pendingDirective from './pending.directive';
import pendingService from './pending.service';
import pendingRoute from './pending.route';

export default angular.module('Pending', [])
	.config(pendingRoute)
	.service('pendingService', pendingService)
	.directive('pending', pendingDirective);