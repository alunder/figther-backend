
const Joi = require('joi');
const SetDummyService = require('../services/set-dummy');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.setDummy = {
	auth: false,
	description: 'Set Dummy Data',
	notes: 'Set Dummy Data',
	tags: [],
	validate: {
		
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
			const set_dummy_res = await SetDummyService.setDummy(req,res);
			return res(set_dummy_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.setLocation = {
	auth: false,
	description: 'Set Location Dummy Data',
	notes: 'Set Location Dummy Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			name: Joi.string().required(),            			
		}).label('Set Location Dummy Data')
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
			const set_location_res = await SetDummyService.setLocation(req,res);
			return res(set_location_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.setFighter = {
	auth: false,
	description: 'Set Fighter Dummy Data',
	notes: 'Set Fighter Dummy Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            avatar: Joi.string().required(),
            main_type:Joi.string().valid("Boxeo", "K1", "MMA","Muay Thai").required(),
            extra_type:Joi.string().valid("Boxeo", "K1", "MMA","Muay Thai").required(),
            organization: Joi.string().required(),
            supervision: Joi.string().required(),
            contact_email:Joi.string().email().required(),
            contact_mobile:Joi.number().required(),
            gender: Joi.string().valid("male","female").required(),
            weight: Joi.number().required(),
            level: Joi.string().required(),
            win_num: Joi.number().required(),
            fail_num: Joi.number().required(),
            equal_num: Joi.number().required(),
            ko_num: Joi.number().required(),
            birthday: Joi.date().required()
		}).label('Set Fighter Dummy Data')
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
			const set_fighter_res = await SetDummyService.setFighter(req,res);
			return res(set_fighter_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteChat = {
	auth: false,
	description: 'Delete Chat Data',
	notes: 'Delete Chat Data',
	tags: [],
	validate: {
		
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
			const _res = await SetDummyService.deleteChat(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteAllData = {
	auth: false,
	description: 'Delete Chat Data',
	notes: 'Delete Chat Data',
	tags: [],
	validate: {
		
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
			const _res = await SetDummyService.deleteAllData(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};