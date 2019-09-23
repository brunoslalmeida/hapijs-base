const Joi = require ('@hapi/joi');
const {ID_R} = require(__dirname + '/../types');

exports.LoginSchema = Joi.object({
	id: ID_R
})