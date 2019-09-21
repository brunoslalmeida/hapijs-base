const Joi = require ('@hapi/joi');
const {EMAIL_R, PASSWORD_R} = require(__dirname + '/../types');

exports.LoginSchema = Joi.object({
	mail: EMAIL_R,
	pass: PASSWORD_R
})