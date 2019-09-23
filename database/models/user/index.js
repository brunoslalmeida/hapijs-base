const Sequelize = require('sequelize');
const DB = require(__dirname + '/../../../database');


let model = null;
var entry = {};

entry.getModel = function () {
	if (model == null) {
		model = DB.define('users', definition, options);
	}
	return model;
};

entry.createRelations = () => { }

entry.fields = {
	...DB.defaultValue,
	
	id: 'id',
	name: 'name',
	role: 'role',
	mail: 'mail',
	pass: 'pass',
}

const definition = {
	id: {
		type: Sequelize.UUID,
		field: 'user_id',
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	name: {
		type: Sequelize.STRING,
		field: 'user_name',
		allowNull: false
	},
	mail: {
		type: Sequelize.STRING,
		field: 'user_email',
		allowNull: false
	},
	pass: {
		type: Sequelize.STRING,
		field: 'user_password',
		allowNull: false
	},
	role: {
		type: Sequelize.STRING,
		field: 'user_role',
		allowNull: false
	}
};

const options = {
	freezeTableName: true,
	paranoid: true,
};

module.exports = entry;