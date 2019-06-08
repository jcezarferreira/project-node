const exception = require('../exceptions/exception');
const connection = require('../config/connection');

module.exports.enableCors = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
};

module.exports.notFound = (req, res, next) => {
	return next(new exception.ResourceNotFound());
};

module.exports.createConnection = async (req, res, next) => {
	try {
		req.conn = await connection.generate(req.conn);
		return next();
	} catch (error) {
		return next(error);
	}
};

module.exports.serverError = (err, req, res, next) => {
	const error = exception.getKnownError(err);
	return res.status(error.status || 500).json({ message: error.message });
};
