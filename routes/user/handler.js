const Curd = require(__dirname + '/../../tools/crud');
const UserModel = require(__dirname + '/../../database/models/user');

handler = {}

handler.get = async (request, h) => {
	const fields = UserModel.fields;

	let closure = {
		attributes : [
			fields.id, fields.name, fields.mail, fields.role
		],
		where: {
			id: request.params.id || request.auth.credentials.id
		}
	};
	
	return await Curd.get(closure, UserModel.getModel());
}

handler.put = (request, h) => {

}

handler.post = (request, h) => {

}

module.exports = handler;