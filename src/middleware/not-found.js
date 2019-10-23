const { ResourceNotFound } = require('../exceptions/exception');

module.exports = (req, res, next) => next(new ResourceNotFound());
