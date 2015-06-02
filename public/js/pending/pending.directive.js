import template from "./pending.html!text";
import pendingController from "./pending.controller";

function pendingDirective() {
	return {
    	restrict: "E",
    	replace: true,
    	scope: true,
    	template: template,
    	bindToController: true,
    	controllerAs: "vm",
    	controller: pendingController
	};
}

pendingDirective.$inject = [];

export default pendingDirective;