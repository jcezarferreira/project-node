
module.exports = class ResourceNotFound {
  constructor(message) {
    this.name = 'ResourceNotFound';
    this.message = message || 'Não encontrado';
    this.status = 404;
    this.stack = (new Error()).stack;
  }
};

module.exports = class InvalidFields  {
  constructor(message) {
    this.name = 'InvalidFields';
    this.message = message || 'Campos inválidos';
    this.status = 400;
    this.stack = (new Error()).stack;
  }
};

module.exports = class InvalidParams {
  constructor(message) {
    this.name = 'InvalidParams';
    this.message = message || 'Parâmetros inválidos';
    this.status = 400;
    this.stack = (new Error()).stack;
  }
};

module.exports = class InvalidSession {
  constructor(message) {
    this.name = 'InvalidSession';
    this.message = message || 'Sessão inválida';
    this.status = 401;
    this.stack = (new Error()).stack;
  }
};

module.exports = class Unauthorized {
  constructor(message) {
    this.name = 'Unauthorized';
    this.message = message || 'Não autorizado';
    this.status = 401;
    this.stack = (new Error()).stack;
  }
};

module.exports.getKnownError = (error) => {
  const knownErrors = {
    CastError: new this.InvalidParams(),
    JsonWebTokenError: new this.Unauthorized(),
    TokenExpiredError: new this.InvalidSession(),
    ValidationError: new this.InvalidFields(error),
    AlreadyRegistered: new this.AlreadyRegistered(),
  };

  return knownErrors[error.name] || error;
};
