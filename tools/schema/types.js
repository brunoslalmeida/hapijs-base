const Joi = require('@hapi/joi');

exports.EMAIL_R = Joi.string().email().required();
exports.PASSWORD_R = Joi.string().min(8).max(30).required();