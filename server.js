require('dotenv').config();

const FS = require('fs');
const Hapi = require('@hapi/hapi');

const DB = require(__dirname + '/database');

const { RoutesPath, Strategy, State, Roles } = require(__dirname + '/config');

init = async () => {

	let server = Hapi.server({
		host: process.env.HOST || '0.0.0.0',
		port: process.env.PORT || 8001,
		routes: {
			cors: {
				origin: ['*'], //Change this to the correct one on production!
				credentials: true
			},
			//TODO remove in production
			validate: {
				failAction: (request, h, err) => {
					throw err;
				}
			}
		},
	});

	const cache = server.cache({ segment: Strategy, expiresIn: 60 * 60 * 1000 });
	server.app.cache = cache;

	let plugins = [
		{
			plugin: require('@hapi/cookie')
		},
		{
			plugin: require('hapi-authorization'),
			options: {
				roles: Roles,
				hierarchy: true,
				roleHierarchy: Roles
			}
		}
	];

	await server.register(plugins);

	server.auth.strategy(Strategy, 'cookie', {
		cookie: {
			name: State,
			password: 'password-should-be-32-characters',
			isSecure: false,
			clearInvalid: true,
			isHttpOnly: true,
		},
		validateFunc: async (request, session) => {
			const cached = await cache.get(session.sid);
			const out = {
				valid: !!cached
			};

			if (out.valid) {
				out.credentials = cached.account;
			}

			return out;
		}
	});

	let routes = FS.readdirSync(RoutesPath);

	routes.forEach((file) => {
		let route = require(__dirname + '/' + RoutesPath + '/' + file);
		route.route(server);
	});

	//True for db reacreation
	await DB.connect(false);
	await server.start();
	console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();