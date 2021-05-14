const Joi = require('joi');
const AdminEventManageService =  require('../services/admin-event-manage');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');

exports.add = {
	auth: false,
	description: 'Add Event Data',
	notes: 'Add Event Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
            name: Joi.string().required(),
			location: Joi.string().required(),
			location_name: Joi.string(),
			date:Joi.string().required(),
			avatar: Joi.string().required(),
			notes: Joi.string(),          
            price_list:Joi.array().items(Joi.object({
                position:Joi.string().required(),
                price:Joi.number().required(),				
            })),
            player_list:Joi.array().items(Joi.object({
                player:Joi.string().required(),
                player_opponent:Joi.string().required(),				
            })),
		}).label('Add Event Data')
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
			const _res = await AdminEventManageService.add(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getAll = {
	auth: false,
	description: 'Get All Event List',
	notes: 'Get All Event List',
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
			const _res = await AdminEventManageService.getAll(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteEvent = {
	auth: false,
	description: 'Delet Event',
	notes: 'Delete Event',
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
			const _res = await AdminEventManageService.deleteEvent(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getOne = {
	auth: false,
	description: 'Get Event By Id',
	notes: 'Get Event By Id',
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
			const _res = await AdminEventManageService.getOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};

exports.updateOne = {
	auth: false,
	description: 'Update Event Data',
	notes: 'Update Event Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			name: Joi.string().required(),
			location: Joi.string().required(),
			location_name: Joi.string(),
			date:Joi.string().required(),
			avatar: Joi.string().required(),
			notes:Joi.string(),          
            price_list:Joi.array().items(Joi.object({
                position:Joi.string().required(),
                price:Joi.number().required(),				
            })),
            player_list:Joi.array().items(Joi.object({
                player:Joi.string().required(),
                player_opponent:Joi.string().required(),				
            })),            

		}).label('Update Event Data')
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
			const _res = await AdminEventManageService.updateOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};

