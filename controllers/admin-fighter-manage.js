const Joi = require('joi');
const AdminFighterManageService =  require('../services/admin-fighter-manage');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');

exports.add = {
	auth: false,
	description: 'Add Fighter Data',
	notes: 'Add Fighter Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            avatar: Joi.array(),
            main_type:Joi.string().valid("Boxeo", "K1", "MMA","Muay Thai").required(),
            gender:Joi.string().valid("Masculino", "Femenino").required(),                    
            // birthday:Joi.string(),
            weight:Joi.number().required(),
            level:Joi.string().required(),
            win_num:Joi.number().required(),
            fail_num:Joi.number().required(),
            equal_num:Joi.number().required(),
			ko_num:Joi.number(),
			requested_club_id: Joi.string().required(),
            stadium:Joi.object({
                image:Joi.string().allow(''),
                name:Joi.string(),
                location: Joi.string(),
            }),
            competition_profile_list:Joi.array().items(Joi.object({
                earned:Joi.string().required(),
                against_name:Joi.string().required(),
				name_velada: Joi.string().required(),
				rival: Joi.string().required(),
				date: Joi.string().required(),
				is_fighter: Joi.any(),
            })),
            championship_list:Joi.array().items(Joi.object({
                name:Joi.string().required(),
                description:Joi.string().required(),                
            }))

            

		}).label('Add Fighter Data')
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
			const _res = await AdminFighterManageService.add(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getAll = {
	auth: false,
	description: 'Get All Fighter List',
	notes: 'Get All Fighter List',
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
			const _res = await AdminFighterManageService.getAll(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getAllForApprove = {
	auth: false,
	description: 'Get All Fighter List For Approve',
	notes: 'Get All Fighter List For Approve',
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
			const _res = await AdminFighterManageService.getAllForApprove(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.deleteFighter = {
	auth: false,
	description: 'Delet Fighter',
	notes: 'Delete Fighter',
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
			const _res = await AdminFighterManageService.deleteFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.approveFighter = {
	auth: false,
	description: 'Approve Fighter',
	notes: 'Approve Fighter',
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
			const _res = await AdminFighterManageService.approveFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.rejectFighter = {
	auth: false,
	description: 'Reject Fighter',
	notes: 'Reject Fighter',
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
			const _res = await AdminFighterManageService.rejectFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.getOne = {
	auth: false,
	description: 'Get Fighter By Id',
	notes: 'Get Fighter By Id',
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
			const _res = await AdminFighterManageService.getOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};

exports.updateOne = {
	auth: false,
	description: 'Update Fighter Data',
	notes: 'Update Fighter Data',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            avatar: Joi.array(),
            main_type:Joi.string().valid("Boxeo", "K1", "MMA","Muay Thai").required(),
            gender:Joi.string().valid("Masculino", "Femenino").required(),                    
            // birthday:Joi.string(),
            weight:Joi.number().required(),
            level:Joi.string().required(),
            win_num:Joi.number().required(),
            fail_num:Joi.number().required(),
            equal_num:Joi.number().required(),
			ko_num:Joi.number(),
			requested_club_id: Joi.string().required(),
            stadium:Joi.object({
                image:Joi.string().allow(''),
                name:Joi.string(),
                location: Joi.string(),
            }),
            competition_profile_list:Joi.array().items(Joi.object({
                earned:Joi.string().required(),
                against_name:Joi.string().required(),
				name_velada: Joi.string().required(),
				rival: Joi.string().required(),
				date: Joi.string().required(),
				is_fighter: Joi.any(),
            })),
            championship_list:Joi.array().items(Joi.object({
                name:Joi.string().required(),
                description:Joi.string().required(),                
            }))

            

		}).label('Update Fighter Data')
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
			const _res = await AdminFighterManageService.updateOne(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};