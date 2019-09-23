role = {
	admin: "admin",
	user: "user",
	guest: "guest",
}

role.default = role.user;
role.unauth = role.guest;

exports.Role = role;

//The order matters
exports.Roles = [
	role.admin,
	role.user,
	role.guest
]
	
exports.Methods = {
	GET: "GET",
	POST: "POST",
	DELETE: "DELETE",
	PUT: "PUT"
};
exports.RoutesPath = 'routes';
exports.Strategy = 'auth';
exports.State = process.env.COOKIE || 'CHANGEME';
exports.ModelsPath = 'models'