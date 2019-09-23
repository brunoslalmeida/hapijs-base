const Joi = require('@hapi/joi');
const { ID_R, PASSWORD, EMAIL, NAME, ROLE } = require(__dirname + '/../types');

exports.UserIDSchema = Joi.object({
	id: ID_R
});

exports.SimpleUserSchema = Joi.object({
	name: NAME,
	mail: EMAIL,
	pass: PASSWORD
})

exports.UserSchema = Joi.object({
	name: NAME,
	mail: EMAIL,
	pass: PASSWORD,
	role: ROLE
})