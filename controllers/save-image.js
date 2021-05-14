const Joi = require('joi');
const SaveImageService = require('../services/save-image');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.imageUpload = {
    // auth: {
    // 	strategy: 'token',
    // 	scope: ['merchant']
    // },
    auth: false,
    description: 'Image Upload',
    notes: 'Image Upload',
    tags: [],
    payload: {
      maxBytes: 1000 * 1000 * 5, // 5 Mb
      output: 'stream',
      parse: false,
    },
    handler: function (request, reply) {
      SaveImageService.saveImage(request, reply);
    }
  };
  exports.imageUploadAdmin = {
    // auth: {
    // 	strategy: 'token',
    // 	scope: ['merchant']
    // },
    auth: false,
    description: 'Image Upload',
    notes: 'Image Upload',
    tags: [],
    payload: {
      maxBytes: 1000 * 1000 * 5, // 5 Mb
      output: 'stream',
      parse: false,
    },
    handler: function (request, reply) {
      SaveImageService.saveImageAdmin(request, reply);
    }
  };