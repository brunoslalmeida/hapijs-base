const Handler = require(__dirname + '/handler');

const { Methods, Strategy } = require(__dirname + '/../../config');
const { LoginSchema } = require(__dirname + '/../../tools/schema/auth');

let auth = {};

auth.route = server => {
	server.route([
		{
			method: Methods.POST,
			path: '/login/',
			config: {
				handler: Handler.login,				
				validate: {
					payload: LoginSchema
				},
			}
		},
		{
			method: Methods.GET,
			path: '/logout/',
			config: {
				auth: {
					strategy: Strategy
				},
				handler: Handler.logout
			}
		}
	]);
}

module.exports = auth;
