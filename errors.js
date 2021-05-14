const Boom = require('boom');

exports.notFound = {
  // siteNotFound: Boom.notFound('Site not found')
};

exports.badRequest = {
  invalidAuthentication: Boom.badRequest(`Invalid username or password.`),
  // userNotProvided: Boom.badRequest(`'x-user-id' header must be provided for API key requests`)
};
