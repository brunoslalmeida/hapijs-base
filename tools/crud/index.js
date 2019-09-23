const Boom = require('@hapi/boom');

let crud = {};

crud.get = (closure, model) => new Promise((res, rej) => {
	model.findOne(closure || {})
		.then(item => {
			res(item)
		})
		.catch(err => {
			rej(Boom.internal());
		});
});


crud.all = (closure, model) => new Promise((res, rej) => {
	model.findAll(closure || {}).then(items => {
		res(items);
	}).catch(err => {
		rej(Boom.internal());
	})
});

crud.add = (payload, model) => new Promise((res, rej) => {
	model.create(payload)
		.then(result => res({ id: result.dataValues.id }))
		.catch(err => {
			if (err.name === "SequelizeUniqueConstraintError") {
				rej(Boom.conflict(removeIdFromConflict(err)));
			}

			if (err.name === "SequelizeForeignKeyConstraintError") {
				rej(Boom.badData());
			}

			console.log(err);
			rej(Boom.internal());
		});
});

crud.set = (payload, closure, model) => new Promise((res, rej) => {
	closure = closure || {};
	if (closure.where == undefined || closure.where.id == undefined) {
		return Boom.notAcceptable();
	}
	model.update(payload, closure).then(() => {
		res({});
	}).catch(err => {
		if (err.name === "SequelizeUniqueConstraintError") {
			//In case of multi unique, its send id, so i have to remove it
			rej(Boom.conflict(removeIdFromConflict(err)));
		}
		else if (err.name === "SequelizeForeignKeyConstraintError") {
			rej(Boom.badData());
		}
		else {
			rej(Boom.internal());
		}
	});
});

crud.rm = (closure, model) => new Promise((res, rej) => {
	closure = closure || {};

	if (closure.where == undefined || closure.where.id == undefined) {
		return Boom.notAcceptable();
	}

	model.destroy(closure).then(_ => {
		res({})
	}).catch (_ => {
		rej(Boom.internal());
	})
});

removeIdFromConflict = (err) => {
	regex = /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
	return err.fields[Object.keys(err.fields)[0]].replace(regex, "");
};

module.exports = crud;