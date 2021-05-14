const get = require('lodash/get');
const pick = require('lodash/pick');
const {USER_ID, CONSUMER_CUSTOM_ID, CONSUMER_USERNAME} = require('../constants/headers');

const CONSUMER_HEADERS = ['authorization'];

exports.getUsernameFromHeaders = headers => {
	const consumerUsername = get(headers, CONSUMER_USERNAME);
	if (consumerUsername && consumerUsername.startsWith('server:project:')) {
		// For API key auth just use the full username
		return consumerUsername;
	}
	const username = consumerUsername ? consumerUsername.split(':').slice(-1)[0] : null;
	return username;
};

exports.getUserIdFromHeaders = headers => {
	let userId = get(headers, CONSUMER_CUSTOM_ID);
	if (userId) {
		return userId;
	}
	// For server API key auth the 'x-user-id' header may be passed.
	// We prefix this with server to differentiate from normal user
	userId = get(headers, USER_ID);
	return userId ? `server:${userId}` : null;
};

exports.getUserFromHeaders = headers => {
	const username = exports.getUsernameFromHeaders(headers);
	const userId = exports.getUserIdFromHeaders(headers);
	return {username, userId};
};

exports.getConsumerAuthHeaders = headers => pick(headers, CONSUMER_HEADERS);
