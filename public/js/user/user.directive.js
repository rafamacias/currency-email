import template from "./user.html!text";
import UserController from "./user.controller";

function userDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: true,
    template: template,
    bindToController: true,
    controllerAs: "vm",
    controller: UserController
  };
}

userDirective.$inject = [];

export default userDirective;