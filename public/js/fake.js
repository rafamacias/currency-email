var userService = {
	insert : function(user, callback) {
		setTimeout(function () {
			console.lgo('inserting user in DB: ' + user);
			callback(user);
		},10)
	}
} 


var router = {
	redirect: function (page){
		console.log('redirecting to page ' + page)
	}
}

export default {userService, router};
