import userDirective from './user.directive';
import userService from './user.service';

export default angular.module('User', [])
	.service('userService', userService)
	.directive('user', userDirective);