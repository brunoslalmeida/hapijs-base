const Handler = require(__dirname + '/handler');
const { Methods, Strategy } = require(__dirname + '/../../config');

let user = {};

user.route = server => {
	server.route([
		{
			method: Methods.GET,
			path: '/test',
			config: {
				handler: Handler.helloWorld
			}
		},
		{
			method: Methods.GET,
			path: '/secure',
			config: {
				auth: {
					strategy: Strategy
				},
				handler: Handler.helloWorldSecure
			}
		}
	]);
}

module.exports = user;
