
const UserModel = require('../models/user');
const Joi = require('joi');
const UserService = require('../services/user');
const authResponseSchema = Joi.object().keys({
	username: Joi.string().required(),
	email: Joi.string().email(),
}).label('Authentication response');
exports.sign_up = {
	auth: false,
	description: 'SignUp',
	notes: 'Sign Up',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			username: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()			
		}).label('Sign Up request')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Successfully register',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const sign_up_res = await UserService.sign_up(req,res);
			return res(sign_up_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.login = {
	auth: false,
	description: 'Login',
	notes: 'Login',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			username: Joi.string().required(),           
            password: Joi.string().required()			
		}).label('Login request')
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
			const login_res = await UserService.login(req,res);
			return res(login_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.profileSave = {
	auth: false,
	description: 'Profile Save',
	notes: 'Profile Save',
	tags: [],
	validate: {
		payload: Joi.object().keys({		
            full_name: Joi.string().required(),
            alert_flag_1: Joi.boolean().required(),
            alert_flag_2:Joi.boolean().required(),
            alert_flag_3: Joi.boolean().required(),
            alert_flag_4: Joi.boolean().required(),
			str_card_info:Joi.string(),
			avatar:Joi.string().allow(null).allow(""),
		}).label('Profile Save request')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Profile Saved',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const profile_save_res = await UserService.profileSave(req,res);
			return res(profile_save_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.profileMainGet = {
	auth: false,
	description: 'Profile Main',
	notes: 'Profile Main',
	tags: [],
	validate: {
		
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Profile Main',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const profile_main_get_res = await UserService.profileMainGet(req,res);
			return res(profile_main_get_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.forgetPassword = {
	auth: false,
	description: 'Forget Password',
	notes: 'Forget Password',
	tags: [],
	validate: {
		payload: Joi.object().keys({		
            email: Joi.string().required().email(),            
		}).label('Forget Password')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'forgetPassword',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const forget_password_res = await UserService.forgetPassword(req,res);
			return res(forget_password_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.passwordReset = {
	auth: false,
	description: 'Password Reset',
	notes: 'Password Reset',
	tags: [],
	validate: {
		payload: Joi.object().keys({		
            password: Joi.string().required(),            
		}).label('Password Reset')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Password Reset',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const password_reset_res = await UserService.passwordReset(req,res);
			return res(password_reset_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.followFighter = {
	auth: false,
	description: 'Follow Fighter',
	notes: 'Follow Fighter',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			_id: Joi.string().required(),           
		}).label('Follow Fighter request')
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
			const _res = await UserService.followFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.unfollowFighter = {
	auth: false,
	description: 'Un Follow Fighter',
	notes: 'Un Follow Fighter',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			_id: Joi.string().required(),           
		}).label('Un Follow Fighter request')
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
			const _res = await UserService.unfollowFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.followEvent = {
	auth: false,
	description: 'Follow Event',
	notes: 'Follow Event',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			_id: Joi.string().required(),           
		}).label('Follow Event request')
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
			const _res = await UserService.followEvent(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.unfollowEvent = {
	auth: false,
	description: 'Un Follow Event',
	notes: 'Un Follow Event',
	tags: [],
	validate: {
		payload: Joi.object().keys({			
			_id: Joi.string().required(),           
		}).label('Un Follow Event request')
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
			const _res = await UserService.unfollowEvent(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.saveFighter = {
	auth: false,
	description: 'Save Fighter Profile',
	notes: 'Save Fighter Profile',
	tags: [],
	validate: {
		payload: Joi.object().keys({		
			organization: Joi.string().required(),
			main_type: Joi.string().required().valid("Boxeo", "K1", "MMA","Muay Thai"),
			weight: Joi.number().required(),
			win_num: Joi.number().required(),
			fail_num: Joi.number().required(),
			equal_num: Joi.number().required(),
			ko_num: Joi.number().required(),
			stadium: Joi.string().required(),
           
		}).label('Save Fighter Profile')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Profile Saved',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await UserService.saveFighter(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
exports.saveDeviceToken = {
	auth: false,
	description: 'Save Device Token',
	notes: 'Save Device Token',
	tags: [],
	validate: {
		payload: Joi.object().keys({		
			token: Joi.string().required(),			
           
		}).label('Save Device Token')
	},
	plugins: {
		'hapi-swagger': {
			responses: {
				200: {
					description: 'Save Device Token',
					schema: authResponseSchema
				}
			}
		}
	},
	handler: async (req, res) => {
		try {
			const _res = await UserService.saveDeviceToken(req,res);
			return res(_res);
		} catch (err) {
			logger.error(err);
			res(err);
		}
	}
};
