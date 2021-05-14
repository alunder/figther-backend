const Joi = require('joi');
const FighterService = require('../services/fighter');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.getAllFighter = {
	auth: false,
	description: 'Get All Fighter',
	notes: 'Get All Fighter',
	tags: [],
	validate: {
		
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Successfully ',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await FighterService.getAllFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
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
			ko_num:Joi.number().required(),
			requested_club_id: Joi.string().required(),
            stadium:Joi.object({
                image:Joi.string().allow(''),
                name:Joi.string().required(),
                location: Joi.string().required(),
            }),
            competition_profile_list:Joi.array().items(Joi.object({
                earned:Joi.string().required(),
				against_name:Joi.string().required(),
				opponent: Joi.object().unknown(),
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
			const _res = await FighterService.add(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};