import userDirective from './user.directive';

export default angular.module('User', [])
  .directive('user', userDirective);