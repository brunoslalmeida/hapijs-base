'use strict';
//https://github.com/hapijs/cookie
import Hapi from '@hapi/hapi';

const createRoutes = async (files, server) => {
    files.forEach((file) => {
        var route = require(routesDirName + file);
        route.route(server);
    });
}

const registerAuthCookie = async () => {
    await server.register(require('@hapi/cookie'));

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'sid-example',
            password: 'password-should-be-32-characters',

            // For working via HTTP in localhost
            isSecure: false
        },

        redirectTo: '/login',
        validateFunc: async (request, session) => {
            const account = internals.users.find((user) => (user.id === session.id));
            if (!account) return { valid: false };
        
            return { valid: true, credentials: account };
        }
    });
    const cache = server.cache({
        egment: 'sessions',
        expiresIn: 3 * 24 * 60 * 60 * 1000
    });

    server.app.cache = cache;
}

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'], //Change this to the correct one on production!
                credentials: true
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();