const FS = require('fs');
const Sequelize = require('sequelize');

const Crypt = require(__dirname + '/../tools/crypt');
const { ModelsPath, Role } = require(__dirname + '/../config');

var sequelize;
db = {}

db.define = (a, b, c) => {
	return sequelize.define(a, b, c);
};

db.connect = force => {
	sequelize = new Sequelize(
		process.env.DBNAME || 'CHANGEME',
		process.env.DBUSER || 'root',
		process.env.DBPASS || '123456',
		{
			port: process.env.DBPORT || '3306',
			host: process.env.DBHOST || 'localhost',
			dialect: process.env.DBDIALECT || 'mysql'
		}
	);

	db.defaultFields = {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		deletedAt: 'deletedAt',
	}

	let models = FS.readdirSync(__dirname + '/' + ModelsPath);

	models.forEach(path => {

		const model = require(__dirname + '/' + ModelsPath + '/' + path);
		model.getModel();
		model.createRelations();
	});

	return sequelize.sync({ force: force }).then(async () => {
		if (force != true) return;

		let userModel = require(__dirname + '/models/user').getModel();

		await userModel.bulkCreate([
			{
				name: 'Usuário',
				pass: Crypt.createHash('12345678'),
				mail: 'user@marcasnaweb.com.br',
				role: Role.user
			},
			{
				name: 'Administrador',
				pass: Crypt.createHash('12345678'),
				mail: 'admin@marcasnaweb.com.br',
				role: Role.admin
			}
		]);
	});
};

module.exports = db;