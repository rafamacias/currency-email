'use strict';

function userRoute($stateProvider) {
    return $stateProvider
        .state('confirmation', {
            url: "/confirmation",
            template: '<confirmation></confirmation>',
            resolve: {}
        });
}

userRoute.$inject = ['$stateProvider'];
export default userRoute;