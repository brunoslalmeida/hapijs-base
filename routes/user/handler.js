const Curd = require(__dirname + '/../../tools/crud');
const UserModel = require(__dirname + '/../../database/models/user');

handler = {}

handler.get = async (request, h) => {
	const fields = UserModel.fields;

	let closure = {
		attributes: [
			fields.id, fields.name, fields.mail, fields.role
		],
		where: {
			id: request.params.id || request.auth.credentials.id
		}
	};

	console.log(closure);

	try {
		return await Curd.get(closure, UserModel.getModel());
	} catch (err) {
		return err;
	}
}

handler.set = async (request, h) => {
	let closure = {
		where: {
			id: request.params.id || request.auth.credentials.id
		}
	};

	try {
		return await Curd.set(request.payload, closure, UserModel.getModel());
	} catch (err) {
		return err;
	}
}

handler.add = async (request, h) => {
	try {
		return await Curd.add(request.payload, UserModel.getModel());
	} catch (err) {
		return err;
	}
}

handler.all = async  (request, h) => {
	const fields = UserModel.fields;

	let closure = {
		attributes: [
			fields.id, fields.name, fields.mail, fields.role
		]
	};
	try {
		return await Curd.all(closure, UserModel.getModel());
	} catch (err) {
		return err;
	}
}


handler.rm = async (request, h) => {
	let closure = {
		where: {
			id: request.params.id
		}
	};

	try {
		return await Curd.rm(closure, UserModel.getModel());
	} catch (err) {
		return err;
	}
}

module.exports = handler;