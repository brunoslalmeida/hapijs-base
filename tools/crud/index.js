const Boom = require('@hapi/boom');

let crud = {};

crud.add = async (request, model) => {
	try {
		result = await model.create(request.payload);
		return { id: result.dataValues.id };
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			return Boom.conflict(removeIdFromConflict(err));
		}

		if (err.name === "SequelizeForeignKeyConstraintError") {
			return Boom.badData();
		}

		console.log(err);
		return Boom.internal();
	}
};

crud.set = async (request, model) => {
	let id = request.params.id;

	if (id == undefined) {
		return Boom.badData();
	}

	closure = closure || {};

	closure.where = closure.where || {};
	closure.where.id = id;

	try {
		await model.update(request.payload, closure);
		return {};
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			//In case of multi unique, its send id, so i have to remove it
			return Boom.conflict(removeIdFromConflict(err));
		}

		if (err.name === "SequelizeForeignKeyConstraintError") {
			return Boom.badData();
		}

		console.log(err);
		return Boom.internal();
	}
};

crud.all = async (closure, model) => {

	try {
		let items = await model.findAll(closure || {});
		return items;
	} catch (err) {

		console.err("Falha ao realizar all");
		console.log(err);

		return Boom.internal();
	}
};

crud.get = (closure, model) => {
	return new Promise((res, rej) => {
		model.findOne(closure || {})
			.then(item => {
				res(item)
			})
			.catch(err => {
				console.log("Falha ao realizar get");
				console.log(err);

				rej(Boom.internal());
			});
	});
}

crud.rm = async (request, closure) => {
	closure = closure || {};

	closure.where = closure.where || {};
	closure.where.id = request.params.id;

	try {
		await model.destroy(closure);
		return {};
	}
	catch (err) {
		console.err("Falha ao realizar rm");
		console.log(err);
		return Boom.internal();
	}
};

removeIdFromConflict = (err) => {
	regex = /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
	return err.fields[Object.keys(err.fields)[0]].replace(regex, "");
};

module.exports = crud;