/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwtFunctions = require('../jwt/functions');

const { Schema } = mongoose;

const SALT = 16;

const TelefoneSchema = new Schema({
  numero: {
    type: String,
    validate: [
      validators.isNumeric({ message: '{VALUE} não é um número de telefone válido' }),
      validators.isLength({ message: '{VALUE} não é um número de telefone válido' }, 8, 9)],
  },
  ddd: {
    type: String,
    validate: [
      validators.isNumeric({ message: '{VALUE} não é um número de {PATH} válido' }),
      validators.isLength({ message: '{VALUE} não é um número de {PATH} válido' }, 2, 2)],
  },
});

const UserSchema = new Schema({
  nome: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  email: {
    type: String,
    unique: true,
    required: [true, '{PATH} é um campo obrigatório'],
    validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' }),
  },
  senha: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  telefones: [TelefoneSchema],
  ultimo_login: Date,
  salt: String,
  token: String,
}, { timestamps: true });

UserSchema.plugin(unique, { message: '{PATH} já existente' });

UserSchema.pre('save', function (next) {
  try {
    this.ultimo_login = this.updatedAt;

    this.token = jwtFunctions.getToken(this);

    if (!this.isModified('senha')) return next();

    this.salt = crypto.randomBytes(SALT).toString('hex');

    const hash = crypto.pbkdf2Sync(this.senha, this.salt, 10000, 512, 'sha512').toString('hex');

    this.senha = hash;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const hash = crypto.pbkdf2Sync(candidatePassword || '', this.salt, 10000, 512, 'sha512').toString('hex');
  return this.senha === hash;
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
