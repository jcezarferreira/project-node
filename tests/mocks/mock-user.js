module.exports.user = {
  name: 'Julio Cezar',
  email: 'julio@ferreira.com',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};

module.exports.anotherUser = {
  name: 'Jaqueline',
  email: 'jaque@lima.com',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};

module.exports.userWithInvalidEmail = {
  name: 'Julio Cezar',
  email: 'julioferreira.com',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};

module.exports.userWithInvalidPhoneNumber = {
  name: 'Will Smith',
  email: 'will@smith.com',
  password: '123456',
  phones: [{ phoneNumber: '12312', ddd: '11' }],
};

module.exports.userWithInvalidPhoneDDD = {
  name: 'Julio',
  email: 'jcezar@ferreira.com',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '111' }],
};

module.exports.userWithoutEmail = {
  name: 'Julio Cezar',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};

module.exports.userWithoutName = {
  email: 'jdias@ferreira.com',
  password: '123456',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};

module.exports.userWithoutPassword = {
  name: 'Julio Cezar',
  email: 'jcezar@ferreira.com',
  phones: [{ phoneNumber: '123456789', ddd: '11' }],
};
