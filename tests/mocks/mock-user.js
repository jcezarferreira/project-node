module.exports.user = {
    'nome': 'Julio Cezar',
    'email': 'julio@ferreira.com',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};

module.exports.anotherUser = {
    'nome': 'Jaqueline',
    'email': 'jaque@lima.com',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};

module.exports.userWithInvalidEmail = {
    'nome': 'Julio Cezar',
    'email': 'julioferreira.com',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};

module.exports.userWithInvalidTelefoneNumero = {
    'nome': 'Julio Cezar',
    'email': 'julio@ferreira.com',
    'senha': '123456',
    'telefones': [{ 'numero': '12312', 'ddd': '11' }]
};

module.exports.userWithInvalidTelefoneDDD = {
    'nome': 'Julio',
    'email': 'julio@ferreira.com',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '111' }]
};

module.exports.userWithoutEmail = {
    'nome': 'Julio Cezar',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};

module.exports.userWithoutNome = {
    'email': 'julio@ferreira.com',
    'senha': '123456',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};

module.exports.userWithoutSenha = {
    'nome': 'Julio Cezar',
    'email': 'julio@ferreira.com',
    'telefones': [{ 'numero': '123456789', 'ddd': '11' }]
};