
const UserModel = require('../models/user');
const Joi = require('joi');
const UserService = require('../services/user');
const AdminUserService = require('../services/admin-user');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');

exports.login = {
	auth: false,
	description: 'Admin Login',
	notes: 'Admin Login',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			username: Joi.string().required(),           
            password: Joi.string().required()			
		}).label('Admin Login request')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Successfully Login',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await AdminUserService.login(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
