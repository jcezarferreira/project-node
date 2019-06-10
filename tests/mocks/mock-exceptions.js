module.exports.ExceptionsNames = exception => Object.getOwnPropertyNames(exception)
  .filter(exceptionName => exceptionName !== 'getKnownError')
  .map(exceptionName => ({ name: exceptionName }));

module.exports.ExceptionWithoutName = {};
module.exports.UnexpectedException = class UnexpectedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnexpectedException';
    this.message = message;
    this.status = 500;
  }
};
