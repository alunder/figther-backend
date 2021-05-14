const Joi = require('joi');
const AdminClubManageService =  require('../services/admin-club-manage');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');

exports.add = {
	auth: false,
	description: 'Add Club Data',
	notes: 'Add Club Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
            name: Joi.string().required(),
            contact_email: Joi.string().required(),
            contact_phone: Joi.number().required(),
            address: Joi.string().required(),
            logo: Joi.string().allow(''),
            email: Joi.string().required(),
            username:Joi.string().required(),
            password:Joi.string().required(),
            modality_type: Joi.array(),         

		}).label('Add Club Data')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Success',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await AdminClubManageService.add(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getAll = {
	auth: false,
	description: 'Get All Club List',
	notes: 'Get All Club List',
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
			const _res = await AdminClubManageService.getAll(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteClub = {
	auth: false,
	description: 'Delet Club',
	notes: 'Delete Club',
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
			const _res = await AdminClubManageService.deleteClub(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getOne = {
	auth: false,
	description: 'Get Club By Id',
	notes: 'Get Club By Id',
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
			const _res = await AdminClubManageService.getOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};

exports.updateOne = {
	auth: false,
	description: 'Update Club Data',
	notes: 'Update Club Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
            name: Joi.string().required(),
            contact_email: Joi.string().required(),
            contact_phone: Joi.number().required(),
            address: Joi.string().required(),
			logo: Joi.string().allow(''),
			user_id:Joi.string().required(),            
            password:Joi.string(),
            modality_type: Joi.array(),
		}).label('Update Club Data')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Success',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await AdminClubManageService.updateOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};