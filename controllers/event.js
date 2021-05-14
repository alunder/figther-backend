const Joi = require('joi');
const EventService = require('../services/event');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.getAllEvent = {
	auth: false,
	description: 'Get All Event',
	notes: 'Get All Event',
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
			const _res = await EventService.getAllEvent(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};