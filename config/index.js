roles = {
	admin: "admin",
	user: "user",
	guest: "guest",
}

roles.default = roles.user;
roles.unauth = roles.guest;

exports.Roles = roles;

//The order matters
exports.Role = [
	roles.admin,
	roles.user,
	roles.guest
]
	
exports.Methods = {
	GET: "GET",
	POST: "POST",
	DELETE: "DELETE",
	PUT: "PUT"
};
exports.RoutesPath = 'routes';
exports.Strategy = 'auth';
exports.State = 'CHANGEME';
exports.ModelsPath = 'models'