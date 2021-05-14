const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const Mongoose = require('mongoose');
const Moment = require('moment');
Mongoose.set('debug', true);
const Pack = require('../package');
const Env = require('./env');
const {routes} = require('./routes');
const Middleware = require('../app/middleware/user');
const Notification = require('../app/services/notification');
// const ChatService = require('../app/services/chat');
const GroupChatService = require('../app/services/chat-group');
var corsHeaders = require('hapi-cors-headers');
const options = {
	connections: {
		router: {
			stripTrailingSlash: true
		},
		routes: {
			files: {
				relativeTo: Path.join(__dirname, 'static')
			},			
		}
	},	
};

const server = new Hapi.Server(options);
exports.server = server;
server.connection({
	host: Env.HOST,
	port: Env.PORT,
	// labels: ['api']
});
// server.connection({
// 	host: Env.HOST,
// 	port: Env.CHAT_PORT,
// 	labels: ['chat']
// });

server.event('pluginsloaded');
server.ext('onPreResponse', corsHeaders);
server.ext('onRequest', Middleware.user);
const goodOptions = {
	extensions: ['request-internal'],
	reporters: {
		console: [{
			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{
				log: '*',
				response: '*'
			}]
		}, {
			module: 'good-console',
			args: [{
				format: ''
			}]
		}, 'stdout']
	}
};

if (Env.DISABLE_LOG) {
	goodOptions.reporters = {};
}
var privateKey = Env.JWT_PRIVATE_KEY;
var ttl = Env.JWT_TOKEN_EXPIRY;

const startHapi = () => {
	server.register([
		// HapiAccessChecker,
		Inert,
		Vision,			
		{
			register: Good,
			options: goodOptions
		},
		
	], err => {
		if (err) {
			console.info(err);
		}	
		server.route(routes);
		server.emit('pluginsloaded');
	});

	server.on('response', response => {
		if (response.payload) {
			// logger.info(JSON.stringify(response.payload));
			// console.info(JSON.stringify(response.payload));
			// console.info(response.payload);
		}
	});

	if (!module.parent) {
		server.start(err => {
				if (err) {
					throw err;
				}
				// console.info(`Server running at: ${server.info.uri}`);
				Env.checkFolderExist();
		});
	}
	var io = require('socket.io')(server.listener);
	io.set('origins', '*:*');
    io.on('connection', (socket)=> {
		console.log('New connection!');
		// console.log(socket.handshake.query);
		GroupChatService.newConnection(socket);		
		socket.on('send message', function(data){			
			GroupChatService.sendMessage(data,this);
		});
		socket.on('join', function(data){
			console.log("New User Join");
			GroupChatService.join(data,this);
		});
		socket.on('leave', function(data)
		{
			console.log("User Leaved");
			GroupChatService.leave(data,this);		
		});		
		socket.on('disconnect', GroupChatService.disconnection);
	});
	

   
};

const startMongoose = () => {
	const mongoUri = Env.MONGO_URI;
	const loggableMongoUri = mongoUri.substring(mongoUri.indexOf('@') + 1);

	Mongoose.Promise = Promise;

	Mongoose.connect(mongoUri, {
                useMongoClient: true,
		server: {
			auto_reconnect: true, // eslint-disable-line camelcase
			reconnectTries: Number.MAX_VALUE,
			reconnectInterval: 5000,
			socketOptions: {
				keepAlive: 120
			}
		},
		replset: {
			socketOption: {
				keepAlive: 120
			}
		}
	}, err => {
		if (err) {
			console.info(err);
			// logger.error(err);
			throw err;
		}
	});

	Mongoose.connection.on('open', () => {
		// logger.info('Connected API to ' + loggableMongoUri);		
		console.info('Connected API to ' + loggableMongoUri);
	});

	Mongoose.connection.on('error', err => {
		// logger.info('Connection error ' + err + ' for API to ' + loggableMongoUri);
		console.info('Connection error ' + err + ' for API to ' + loggableMongoUri);
		
	});

	Mongoose.connection.on('close', () => {
		// logger.info('Connection closed for API to ' + loggableMongoUri);
		console.info('Connection closed for API to ' + loggableMongoUri);
	});

	Mongoose.connection.on('reconnected', () => {
		// logger.info('Reconnected for API to ' + loggableMongoUri);
		console.info('Reconnected for API to ' + loggableMongoUri);
	});

	Mongoose.connection.on('disconnected', () => {
		// logger.info('Disconnected for API from ' + loggableMongoUri);
		console.info('Disconnected for API from ' + loggableMongoUri);
	});
};

startHapi();
startMongoose();
Notification.initCronJob();