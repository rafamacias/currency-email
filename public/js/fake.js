var userService = {
	insert : function(user, callback) {
		setTimeout(function () {
			console.log('inserting user in DB: ' + user);
			callback(user);
		},10)
	}
} 


var router = {
	redirect: function (page){
		console.log('redirecting to page ' + page)
	}
}

var fake = {
	userService,
	router
}
export default fake;
