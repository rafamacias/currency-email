import userDirective from './user.directive';
import userService from './user.service';
import userRoute from './user.route';

export default angular.module('User', [])
	.config(userRoute)
	.service('userService', userService)
	.directive('user', userDirective);