const Joi = require('@hapi/joi');
const { Role } = require ('../../config');

exports.ID = Joi.string().guid({version: "uuidv4"}).description("Id em format UUID v4");
exports.ID_R = Joi.string().guid({version: "uuidv4"}).required().description("Id em format UUID v4");

exports.EMAIL = Joi.string().email().description("Email");
exports.EMAIL_R = Joi.string().email().required().description("Email");

exports.PASSWORD = Joi.string().min(8).max(30).description("Senha de usuário, mínimo 8 máximo 30 caracteres");
exports.PASSWORD_R = Joi.string().min(8).max(30).required().description("Senha de usuário, mínimo 8 máximo 30 caracteres");

exports.NAME = Joi.string().min(5).max(50).description("Nome de usuário, mínimo 5 máximo 50 caracteres");
exports.NAME_R = Joi.string().min(5).max(50).required().description("Nome de usuário, mínimo 5 máximo 50 caracteres");

exports.ROLE = Joi.any().allow(Role.admin, Role.user, Role.guest).description("Role, pode ser 'admin', 'user', ou 'guest'");
exports.ROLE_R = Joi.any().allow(Role.admin, Role.user, Role.guest).required().description("Role, pode ser 'admin', 'user', ou 'guest'");