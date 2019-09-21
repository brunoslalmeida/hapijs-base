const Sql = require('sequelize');
const DB = require(__dirname + '/../../');

let model = null;
var entry = {};

entry.getModel = function () {
    if (model == null) {
        model = DB.define('users', definition, options);
    }
    return model;
};

entry.createRelations = () => {}

module.exports = entry;

const definition = {
    id: {
        type: Sql.UUID,
        field: 'user_id',
        primaryKey: true,
        defaultValue: Sql.UUIDV4
    },
    name: {
        type: Sql.STRING,
        field: 'user_name',
        allowNull: false
    },
    mail: {
        type: Sql.STRING,
        field: 'user_email',
        allowNull: false
    },
    pass: {
        type: Sql.STRING,
        field: 'user_password',
        allowNull: false
    },    
    role: {
        type: Sql.STRING,
        field: 'user_role',
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    paranoid: true,
};