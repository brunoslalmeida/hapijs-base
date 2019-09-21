const FS = require('fs');
const Sequelize = require('sequelize');

const { ModelsPath } = require(__dirname + '/../config');

var sequelize;
db = {}

db.define = (t, b, o) => sequelize.define(t, b, o);
db.connect = async () => {
	sequelize = new Sequelize(
		process.env.DBNAME || 'CHANGEME',
		process.env.DBUSER || 'root',
		process.env.DBPASS || '123456',
		{
			port: process.env.DBPORT || '3306',
			host: process.env.DBHOST || 'localhost',
			dialect: process.env.DBDIALECT || 'mysql',
			timezone: process.env.DBTIMEZONE || 'America/Sao_Paulo',
		}
	);

	let models = FS.readdirSync(__dirname + '/' + ModelsPath);

	models.forEach(path => {

		const model = require(__dirname + '/' + ModelsPath + '/' + path);
		model.getModel();
		model.createRelations();
	});

	await sequelize.sync();
};

module.exports = db;