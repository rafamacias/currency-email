import template from "./confirmation.html!text";
import confirmationController from "./confirmation.controller";

function confirmationDirective() {
	return {
    	restrict: "E",
    	replace: true,
    	scope: true,
    	template: template,
    	bindToController: true,
    	controllerAs: "vm",
    	controller: confirmationController
	};
}

confirmationDirective.$inject = [];

export default confirmationDirective;