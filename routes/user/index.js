const { Methods, Strategy, Role } = require ('../../config');
const Handler = require(__dirname + '/handler');
const { UserIDSchema, SimpleUserSchema, UserSchema} = require(__dirname + '/../../tools/schema/user');

let user = {};

user.route = server => {
	server.route([
		{
			method: Methods.GET,
			path: '/user',
			config: {
				description: "Lista informações do próprio usuário",
				tags: ['api'],
				handler: Handler.get,
				auth: {
					strategy: Strategy
				},
				plugins: {
					hapiAuthorization: {
						role: Role.user
					}
				},
			}
		},
		{
			method: Methods.GET,
			path: '/user/{id}',
			config: {
				description: "Lista informações de um usuário específico",
				tags: ['api'],
				handler: Handler.get,
				validate: {
					params: UserIDSchema
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
		{
			method: Methods.GET,
			path: '/users',
			config: {
				description: "Lista informações de todos os usuários",
				tags: ['api'],
				handler: Handler.all,
				auth: {
					strategy: Strategy
				},
				plugins: {
					hapiAuthorization: {
						role: Role.admin
					}
				},
			}
		},
		{
			method: Methods.PUT,
			path: '/user',
			config: {
				description: "Edita o próprio usuário",
				tags: ['api'],
				handler: Handler.set,
				auth: {
					strategy: Strategy
				},
				plugins: {
					hapiAuthorization: {
						role: Role.user
					}
				},
				validate: {
					payload: SimpleUserSchema
				}
			}
		},	
		{
			method: Methods.PUT,
			path: '/user/{id}',
			config: {
				description: "Edita um usuário específico	",
				tags: ['api'],
				handler: Handler.set,
				auth: {
					strategy: Strategy
				},
				plugins: {
					hapiAuthorization: {
						role: Role.admin
					}
				},
				validate: {
					payload: UserSchema,
					params: UserIDSchema
				}
			}
		},
		{
			method: Methods.POST,
			path: '/user',
			config: {
				description: "Cria um novo usuário",
				tags: ['api'],
				handler: Handler.add,
				auth: {
					strategy: Strategy
				},
				plugins: {
					hapiAuthorization: {
						role: Role.admin
					}
				},
				validate: {
					payload: UserSchema
				}
			}
		},	
		{
			method: Methods.DELETE,
			path: '/user/{id}',
			config: {
				description: "Remove usuário da base",
				tags: ['api'],
				handler: Handler.rm,
				validate: {
					params: UserIDSchema
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