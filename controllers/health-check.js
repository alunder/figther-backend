const {version} = require('../../package.json');

module.exports = {
	description: 'Healthcheck1',
	notes: 'Returns when the API is up',
	handler: (req, res) => {		
		return res(`version: ${version}`);
	}
};
