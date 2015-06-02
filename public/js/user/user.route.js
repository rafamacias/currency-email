'use strict';

function userRoute($stateProvider) {
    return $stateProvider
        .state('pending', {
            url: "/pending",
            template: '<pending></pending>',
            resolve: {}
        });
}

userRoute.$inject = ['$stateProvider'];
export default userRoute;