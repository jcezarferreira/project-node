module.exports = class InvalidFields extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidFields';
        this.message = getError(message);
        this.status = 400;
        this.stack = (new Error()).stack;
    }   
};

const getError = (message) => {
    for (var errorKey in message.errors);

    if (errorKey)
        return message.errors[errorKey].message;
    return message || 'Campos inválidos';
}
