const  exception = require('../exception');

module.exports.enableCors = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
};

module.exports.notFound = (req, res, next) => {
	return next(new exception.ResourceNotFound());
};

module.exports.serverError = (err, req, res, next) => {
	return res.status(err.status || 500).json({mensagem: err.message});
};
