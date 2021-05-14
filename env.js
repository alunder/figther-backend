require('dotenv').config();

const {env} = process;
var path = require('path');
var fs = require('fs');
/**
 * Central file to initialise environmental variables.
 *
 * ONLY INCLUDE NON-SENSITIVE CONFIGURATION
 * @type {string|*}
 */
exports.HOST = env.HOST || '0.0.0.0';
exports.PORT = parseInt(env.PORT, 10) || 3000;
exports.CHAT_PORT = parseInt(env.CHAT_PORT, 10) || 3001;
exports.LOG_LEVEL = env.LOG_LEVEL || 'debug';
exports.MONGO_URI = env.MONGO_URI || 'mongodb://localhost:27017/ringbell';
exports.DISABLE_LOG = env.DISABLE_LOG || false;
exports.JWT_PRIVATE_KEY = '37LvDSm4XvjYOh9Y';
exports.JWT_TOKEN_EXPIRY = 1 * 30 * 1000 * 60;
exports.IMAGE_PATH = './public/image/';
exports.checkFolderExist = function() {   
    
};
