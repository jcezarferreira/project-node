
const Unauthorized = require('./errors/unauthorized');
const InvalidSession = require('./errors/invalid-session');
const InvalidFields = require('./errors/invalid-fields');
const InternalServerError = require('./errors/internal-server-error');
const AlreadyExists = require('./errors/already-exists');
const InvalidCredentials = require('./errors/invalid-credentials');
const ResourceNotFound = require('./errors/resource-not-found');

const getKnownError = function (error) {
	if (!error['name'])
		error = { name: 'InternalServerError' };

	const knownErrors =
	{
		'JsonWebTokenError': new Unauthorized(),
		'TokenExpiredError': new InvalidSession(),
		'ValidationError': new InvalidFields(error),
		'InternalServerError': new InternalServerError(),
		'AlreadyExists': new AlreadyExists(),
		'InvalidCredentials': new InvalidCredentials(),
		'ResourceNotFound': new ResourceNotFound()
	};

	return knownErrors[error.name] || error;
};

module.exports = { getKnownError, Unauthorized, InvalidSession, InvalidFields, InternalServerError, AlreadyExists, ResourceNotFound, InvalidCredentials };

