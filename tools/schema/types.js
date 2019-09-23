const Joi = require('@hapi/joi');

exports.ID = Joi.string().guid({version: "uuidv4"});
exports.ID_R = Joi.string().guid({version: "uuidv4"}).required();

exports.EMAIL = Joi.string().email();
exports.EMAIL_R = Joi.string().email().required();

exports.PASSWORD = Joi.string().min(8).max(30);
exports.PASSWORD_R = Joi.string().min(8).max(30).required();