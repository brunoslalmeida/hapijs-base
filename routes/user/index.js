const { Methods, Strategy, Role } = require ('../../config');
const Handler = require(__dirname + '/handler');
const { UserGetSchema } = require(__dirname + '/../../tools/schema/user');

let user = {};

user.route = server => {
	server.route([
		{
			method: Methods.GET,
			path: '/user/',
			config: {
				handler: Handler.get,
				auth: {
					strategy: Strategy
				}
			}
		},
		{
			method: Methods.GET,
			path: '/user/{id}',
			config: {
				handler: Handler.get,
				validate: {
					params: UserGetSchema
				},
				plugins: {
					hapiAuthorization: {
						role: Role.admin
					}
				},
				auth: {
					strategy: Strategy
				}
			}
		},
	]);
}


module.exports = user