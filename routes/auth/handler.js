const UUID = require('uuid/v4')
const assert = require('assert');
const Boom = require ('@hapi/boom');

const Crud = require(__dirname + "/../../tools/crud");
const { State } = require(__dirname + '/../../config');
const Crypt = require(__dirname + "/../../tools/crypt");
const UserModel = require(__dirname + "/../../database/models/user");

const handler = {}

handler.login = async (request, h) => {

	pass = Crypt.createHash(request.payload.pass);
	mail = request.payload.mail ;

    try {
		let model = UserModel.getModel();
		let user = await Crud.get({where: {mail: mail}}, model);

		user = user.dataValues;

		assert.strictEqual(user.pass, pass);

		const sid = UUID();

		await request.server.app.cache.set(sid, {
			account: {
				id: user.id,
				role: user.role
			}
		}, 0);
		request.cookieAuth.set({ sid });

		return {};
	} catch (err) {
	 	return Boom.unauthorized();
	}
}

handler.logout = (request, h) => {
	request.server.app.cache.drop(request.state[State].sid);
	request.cookieAuth.clear();
	return {}
}

module.exports = handler;