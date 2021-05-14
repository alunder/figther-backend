
const UserModel = require('../models/user');
const Joi = require('joi');
const UserService = require('../services/user');
const AdminUserService = require('../services/admin-user');
const AdminUserManageService = require('../services/admin-user-manage');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');

exports.getAll = {
	auth: false,
	description: 'Get All User List',
	notes: 'Get All User List',
	tags: [],
	validate: {
		
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Successfully',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await AdminUserManageService.getAll(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteUser = {
	auth: false,
	description: 'Delet User',
	notes: 'Delete User',
	tags: [],
	validate: {
		
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Successfully',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await AdminUserManageService.deleteUser(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
