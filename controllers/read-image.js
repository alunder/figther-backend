const Joi = require('joi');
const ReadImageService = require('../services/read-image');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.readImage = {   
    auth: false,
    description: 'Read Image',
    notes: 'Read Image',
    tags: [],
    validate: {
        params: {
            name: Joi.string().required()
        },
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
    handler: function (request, reply) {
      ReadImageService.readImage(request, reply);
    }
};